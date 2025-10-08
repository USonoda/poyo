#!/usr/bin/env bash
set -euo pipefail

echo "Setting up frontend dependencies..."
(cd frontend && npm install)

echo "Setting up backend virtual environment..."
python3 -m venv .venv
source .venv/bin/activate
pip install -e "backend[dev]"

echo "Bootstrap complete."
