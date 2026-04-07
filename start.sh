#!/usr/bin/env sh
set -eu

PORT="${PORT:-8080}"
HOST="${HOST:-127.0.0.1}"
export PORT HOST

if ! command -v node >/dev/null 2>&1; then
  printf '%s\n' "Node.js was not found in PATH."
  printf '%s\n' "Install Node.js from https://nodejs.org/ and try again."
  exit 1
fi

node scripts/serve.js
