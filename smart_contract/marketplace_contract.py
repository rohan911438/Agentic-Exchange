from __future__ import annotations

from pyteal import (
    App,
    Approve,
    Btoi,
    BoxCreate,
    BoxGet,
    BoxPut,
    Bytes,
    BytesZero,
    Concat,
    Extract,
    Global,
    Gtxn,
    If,
    Int,
    Itob,
    Len,
    Mode,
    OnComplete,
    Pop,
    Reject,
    Return,
    Seq,
    Subroutine,
    TealType,
    Txn,
    TxnType,
)


def int8(value):
    return Extract(Itob(value), Int(7), Int(1))


def purchase_key(purchase_id):
    return Concat(Bytes("p:"), purchase_id)


@Subroutine(TealType.uint64)
def is_creator():
    return Txn.sender() == Global.creator_address()


def approval_program():
    purchase_id = Txn.application_args[1]
    agent_id = Txn.application_args[2]
    amount = Btoi(Txn.application_args[3])
    key = purchase_key(purchase_id)

    existing = BoxGet(key)
    creator = Txn.accounts[1]

    common_checks = (
        (Txn.application_args.length() == Int(4))
        & (Global.group_size() == Int(2))
        & (Gtxn[0].type_enum() == TxnType.Payment)
        & (Gtxn[0].sender() == Txn.sender())
        & (Gtxn[0].receiver() == Global.current_application_address())
        & (Gtxn[0].amount() == amount)
        & (Len(purchase_id) > Int(0))
        & (Len(agent_id) > Int(0))
        & (amount > Int(0))
    )

    # Box layout (74 bytes):
    # buyer(32) + creator(32) + amount(8) + type(1) + status(1)
    # type: 1=buy, 2=subscribe ; status: 1=completed
    buy = Seq(
        existing,
        If((common_checks == Int(0)) | (existing.hasValue() != Int(0))).Then(Reject()),
        Pop(BoxCreate(key, Int(74))),
        BoxPut(
            key,
            Concat(
                Txn.sender(),
                creator,
                Itob(amount),
                int8(Int(1)),
                int8(Int(1)),
            ),
        ),
        Approve(),
    )

    subscribe = Seq(
        existing,
        If((common_checks == Int(0)) | (existing.hasValue() != Int(0))).Then(Reject()),
        Pop(BoxCreate(key, Int(74))),
        BoxPut(
            key,
            Concat(
                Txn.sender(),
                creator,
                Itob(amount),
                int8(Int(2)),
                int8(Int(1)),
            ),
        ),
        Approve(),
    )

    on_call = Seq(
        If(Txn.application_args.length() == Int(0)).Then(Reject()),
        If(Txn.application_args[0] == Bytes("buy")).Then(buy),
        If(Txn.application_args[0] == Bytes("subscribe")).Then(subscribe),
        Reject(),
    )

    return Seq(
        If(Txn.application_id() == Int(0)).Then(Approve()),
        If(Txn.on_completion() == OnComplete.OptIn).Then(Approve()),
        If(Txn.on_completion() == OnComplete.CloseOut).Then(Approve()),
        If(Txn.on_completion() == OnComplete.DeleteApplication).Then(Return(is_creator())),
        If(Txn.on_completion() == OnComplete.UpdateApplication).Then(Return(is_creator())),
        If(Txn.on_completion() == OnComplete.NoOp).Then(on_call),
        Reject(),
    )


def clear_program():
    return Approve()


def compile_teal() -> tuple[str, str]:
    from pyteal import compileTeal

    approval = compileTeal(approval_program(), mode=Mode.Application, version=8)
    clear = compileTeal(clear_program(), mode=Mode.Application, version=8)
    return approval, clear
