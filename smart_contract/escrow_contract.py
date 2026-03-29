from __future__ import annotations

from pyteal import (
    App,
    Btoi,
    Bytes,
    Concat,
    Global,
    Gtxn,
    If,
    Int,
    Itob,
    Len,
    Mode,
    OnComplete,
    Return,
    ScratchVar,
    Seq,
    Subroutine,
    TealType,
    Txn,
    TxnType,
    Approve,
    Reject,
    InnerTxnBuilder,
    TxnField,
    TxnType,
    For,
)

BUYER_KEY = Bytes("buyer")
SELLER_KEY = Bytes("seller")
TOTAL_KEY = Bytes("total")
COUNT_KEY = Bytes("milestone_count")
RELEASED_KEY = Bytes("released_count")
STATUS_KEY = Bytes("status")

STATUS_CREATED = Int(0)
STATUS_ACCEPTED = Int(1)
STATUS_FUNDED = Int(2)
STATUS_CLOSED = Int(3)

MAX_MILESTONES = Int(5)


def milestone_key(index: ScratchVar | Int, prefix: bytes) -> Bytes:
    return Concat(Bytes(prefix), Itob(index.load() if isinstance(index, ScratchVar) else index))


@Subroutine(TealType.uint64)
def is_buyer():
    return Txn.sender() == App.globalGet(BUYER_KEY)


# Reserved for future access-control use
@Subroutine(TealType.uint64)
def is_seller():
    return Txn.sender() == App.globalGet(SELLER_KEY)


def approval_program() -> str:
    i = ScratchVar(TealType.uint64)
    sum_amt = ScratchVar(TealType.uint64)
    count = ScratchVar(TealType.uint64)
    amt = ScratchVar(TealType.uint64)

    create = Seq(
        count.store(Btoi(Txn.application_args[2])),
        sum_amt.store(Int(0)),
        # Basic validation
        App.globalPut(BUYER_KEY, Txn.sender()),
        App.globalPut(SELLER_KEY, Bytes("")),
        App.globalPut(TOTAL_KEY, Btoi(Txn.application_args[1])),
        App.globalPut(COUNT_KEY, count.load()),
        App.globalPut(RELEASED_KEY, Int(0)),
        App.globalPut(STATUS_KEY, STATUS_CREATED),
        # Validate seller address length and milestone count
        If(
            (Txn.application_args[0] != Bytes("create"))
            | (count.load() == Int(0))
            | (count.load() > MAX_MILESTONES)
            | (Txn.application_args.length() != count.load() + Int(3))
        ).Then(Reject()),
        # Store milestones in global state
        For(
            i.store(Int(0)),
            i.load() < count.load(),
            i.store(i.load() + Int(1)),
        ).Do(
            Seq(
                amt.store(Btoi(Txn.application_args[i.load() + Int(3)])),
                sum_amt.store(sum_amt.load() + amt.load()),
                App.globalPut(milestone_key(i, b"m"), amt.load()),
                App.globalPut(milestone_key(i, b"r"), Int(0)),
            )
        ),
        # Ensure milestone sum equals total
        If(sum_amt.load() != App.globalGet(TOTAL_KEY)).Then(Reject()),
        Approve(),
    )

    accept = Seq(
        If(App.globalGet(STATUS_KEY) != STATUS_CREATED).Then(Reject()),
        App.globalPut(SELLER_KEY, Txn.sender()),
        App.globalPut(STATUS_KEY, STATUS_ACCEPTED),
        Approve(),
    )

    deposit = Seq(
        # group: [payment, app-call]
        If(
            (Global.group_size() != Int(2))
            | (Gtxn[0].type_enum() != TxnType.Payment)
            | (Gtxn[0].receiver() != Global.current_application_address())
            | (Gtxn[0].sender() != App.globalGet(BUYER_KEY))
            | (Gtxn[0].amount() != App.globalGet(TOTAL_KEY))
            | (Txn.sender() != App.globalGet(BUYER_KEY))
            | (App.globalGet(STATUS_KEY) != STATUS_ACCEPTED)
        ).Then(Reject()),
        App.globalPut(STATUS_KEY, STATUS_FUNDED),
        Approve(),
    )

    release_index = ScratchVar(TealType.uint64)

    release = Seq(
        release_index.store(Btoi(Txn.application_args[1])),
        If(
            (Txn.sender() != App.globalGet(BUYER_KEY))
            | (App.globalGet(STATUS_KEY) != STATUS_FUNDED)
            | (release_index.load() >= App.globalGet(COUNT_KEY))
            | (Len(App.globalGet(SELLER_KEY)) != Int(32))
        ).Then(Reject()),
        If(App.globalGet(milestone_key(release_index, b"r")) != Int(0)).Then(Reject()),
        # Pay seller
        InnerTxnBuilder.Begin(),
        InnerTxnBuilder.SetFields(
            {
                TxnField.type_enum: TxnType.Payment,
                TxnField.receiver: App.globalGet(SELLER_KEY),
                TxnField.amount: App.globalGet(milestone_key(release_index, b"m")),
            }
        ),
        InnerTxnBuilder.Submit(),
        # Mark milestone released
        App.globalPut(milestone_key(release_index, b"r"), Int(1)),
        App.globalPut(RELEASED_KEY, App.globalGet(RELEASED_KEY) + Int(1)),
        If(App.globalGet(RELEASED_KEY) == App.globalGet(COUNT_KEY)).Then(
            App.globalPut(STATUS_KEY, STATUS_CLOSED)
        ),
        Approve(),
    )

    close = Seq(
        If(
            (Txn.sender() != App.globalGet(BUYER_KEY))
            | (App.globalGet(STATUS_KEY) != STATUS_CLOSED)
        ).Then(Reject()),
        Approve(),
    )

    on_call = Seq(
        If(Txn.application_args.length() == Int(0)).Then(Reject()),
        If(Txn.application_args[0] == Bytes("accept")).Then(accept),
        If(Txn.application_args[0] == Bytes("deposit")).Then(deposit),
        If(Txn.application_args[0] == Bytes("release")).Then(release),
        If(Txn.application_args[0] == Bytes("close")).Then(close),
        Reject(),
    )

    program = Seq(
        If(Txn.application_id() == Int(0)).Then(
            If(Txn.application_args.length() >= Int(3)).Then(create).Else(Reject())
        ),
        If(Txn.on_completion() == OnComplete.OptIn).Then(Approve()),
        If(Txn.on_completion() == OnComplete.CloseOut).Then(Approve()),
        If(Txn.on_completion() == OnComplete.DeleteApplication).Then(Return(is_buyer())),
        If(Txn.on_completion() == OnComplete.UpdateApplication).Then(Return(is_buyer())),
        If(Txn.on_completion() == OnComplete.NoOp).Then(on_call),
        Reject(),
    )

    return program


def clear_program() -> str:
    return Approve()


def compile_teal() -> tuple[str, str]:
    from pyteal import compileTeal

    approval = compileTeal(approval_program(), mode=Mode.Application, version=8)
    clear = compileTeal(clear_program(), mode=Mode.Application, version=8)
    return approval, clear
