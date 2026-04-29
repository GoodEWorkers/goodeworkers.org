#!/usr/bin/env bash
# Smoke test the running dev server.
# Fails on:
#   - non-200 status (except expected 404)
#   - Astro/Vite error overlays in the body
#   - missing expected content
#
# Usage: BASE=http://localhost:4321 ./scripts/smoke.sh

set -euo pipefail
BASE="${BASE:-http://localhost:4321}"
fail=0

check_page() {
  local path="$1"
  local expected_status="$2"
  local must_contain="$3"
  local url="${BASE}${path}"
  local body status
  body="$(mktemp)"
  status=$(curl -s -o "$body" -w "%{http_code}" "$url")

  if [[ "$status" != "$expected_status" ]]; then
    echo "FAIL $url status=$status (expected $expected_status)"
    fail=1
  elif grep -qiE "astro-error-overlay|ContentSchemaContains|ReferenceError|Cannot read properties|TypeError|Failed to compile|<title>Error</title>" "$body"; then
    echo "FAIL $url body contains an error marker"
    grep -oE "(ContentSchemaContains[A-Za-z]+|ReferenceError|TypeError|Cannot read properties of [^<]+)" "$body" | head -3 | sed 's/^/      /'
    fail=1
  elif ! grep -qF "$must_contain" "$body"; then
    echo "FAIL $url body missing expected content: $must_contain"
    fail=1
  else
    echo "OK   $url ($status, $(wc -c <"$body") bytes)"
  fi
  rm -f "$body"
}

check_page "/"             "200" "GoodEworkers"
check_page "/legal-notice" "200" "Legal Notice"
check_page "/no-such-page" "404" "Page not found"

if [[ $fail -ne 0 ]]; then
  echo
  echo "Smoke test FAILED"
  exit 1
fi
echo
echo "Smoke test PASSED"
