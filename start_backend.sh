#!/usr/bin/env bash
set -e

# Render injects PORT automatically; default keeps local runs simple.
PORT_VALUE="${PORT:-8000}"
HOST_VALUE="${HOST:-0.0.0.0}"

exec uvicorn backend.main:app --host "${HOST_VALUE}" --port "${PORT_VALUE}"