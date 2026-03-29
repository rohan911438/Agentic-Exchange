from __future__ import annotations

import argparse
import os
import sys
from base64 import b64decode

from dotenv import load_dotenv
from algosdk import mnemonic, logic, account
from algosdk.v2client import algod
from algosdk.transaction import (
    ApplicationCreateTxn,
    OnComplete,
    StateSchema,
    wait_for_confirmation,
)

CURRENT_DIR = os.path.dirname(__file__)
if CURRENT_DIR not in sys.path:
    sys.path.insert(0, CURRENT_DIR)

from escrow_contract import compile_teal


def compile_program(client: algod.AlgodClient, teal_source: str) -> bytes:
    response = client.compile(teal_source)
    return b64decode(response["result"])


def main() -> None:
    load_dotenv()

    parser = argparse.ArgumentParser(description="Deploy escrow contract to Algorand TestNet")
    parser.add_argument("--total", required=True, type=int, help="Total escrow amount")
    parser.add_argument(
        "--milestones",
        required=True,
        help="Comma-separated milestone amounts, e.g. 150,230",
    )
    parser.add_argument(
        "--creator-mnemonic",
        default=os.getenv("CREATOR_MNEMONIC"),
        help="Creator account mnemonic (or set CREATOR_MNEMONIC env var)",
    )
    parser.add_argument(
        "--algod-address",
        default=os.getenv("ALGOD_ADDRESS", "https://testnet-api.algonode.cloud"),
        help="Algod address (default: Algonode TestNet)",
    )
    parser.add_argument(
        "--algod-token",
        default=os.getenv("ALGOD_TOKEN", ""),
        help="Algod token (blank for Algonode)",
    )

    args = parser.parse_args()

    if not args.creator_mnemonic:
        raise SystemExit("Missing creator mnemonic. Provide --creator-mnemonic or CREATOR_MNEMONIC.")

    creator_sk = mnemonic.to_private_key(args.creator_mnemonic)
    creator_addr = account.address_from_private_key(creator_sk)

    try:
        client = algod.AlgodClient(args.algod_token, args.algod_address, timeout=30)
    except TypeError:
        client = algod.AlgodClient(args.algod_token, args.algod_address)

    approval_teal, clear_teal = compile_teal()
    approval_program = compile_program(client, approval_teal)
    clear_program = compile_program(client, clear_teal)

    milestones = [int(x.strip()) for x in args.milestones.split(",") if x.strip()]
    milestone_count = len(milestones)

    if milestone_count == 0:
        raise SystemExit("Milestones list cannot be empty")
    if milestone_count > 5:
        raise SystemExit("Milestone count exceeds MAX_MILESTONES (5)")

    if sum(milestones) != args.total:
        raise SystemExit("Sum of milestones must equal total amount")

    # 4 base uints + 2 per milestone (amount + released) for MAX_MILESTONES=5 -> 14
    global_schema = StateSchema(num_uints=14, num_byte_slices=2)
    local_schema = StateSchema(num_uints=0, num_byte_slices=0)

    app_args = [b"create"]
    app_args.append(args.total.to_bytes(8, "big"))
    app_args.append(milestone_count.to_bytes(8, "big"))

    for m in milestones:
        app_args.append(m.to_bytes(8, "big"))

    params = client.suggested_params()

    txn = ApplicationCreateTxn(
        sender=creator_addr,
        sp=params,
        on_complete=OnComplete.NoOpOC,
        approval_program=approval_program,
        clear_program=clear_program,
        global_schema=global_schema,
        local_schema=local_schema,
        app_args=app_args,
    )

    signed = txn.sign(creator_sk)
    txid = client.send_transaction(signed)
    print(f"Submitted txid: {txid}")
    result = wait_for_confirmation(client, txid, 8)

    app_id = result["application-index"]
    print(f"Deployed app ID: {app_id}")
    print(f"App address: {logic.get_application_address(app_id)}")


if __name__ == "__main__":
    main()
