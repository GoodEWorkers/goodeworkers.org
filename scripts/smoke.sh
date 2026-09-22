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

# Trailing-slash form throughout: it is the canonical form the site serves
# (see src/i18n/routes.ts) and the only one Astro answers in dev.
check_page "/"                      "200" "Helping"
check_page "/legal-notice/"         "200" "Legal Notice"
check_page "/no-such-page/"         "404" "Page not found"
check_page "/thanks/"               "200" "GitHub"

# French mirror
check_page "/fr/"                   "200" "les associations"
check_page "/fr/mentions-legales/"  "200" "Mentions légales"
check_page "/fr/no-such-page/"      "404" "Page introuvable"
check_page "/fr/thanks/"            "200" "GitHub"

# Contributors: gallery + one profile, in both languages
check_page "/contributors/"               "200" "Contributors"
check_page "/contributors/r-ichard/"      "200" "Richard"
check_page "/fr/contributeurs/"           "200" "Contributeurs"
check_page "/fr/contributeurs/r-ichard/"  "200" "Richard"

# Projects: gallery + one profile, in both languages
check_page "/projects/"                            "200" "Projects"
check_page "/projects/goodeworkers-website/"       "200" "GoodEWorkers Website"
check_page "/projects/yoon-crm/"                   "200" "Yoon CRM"
check_page "/fr/projets/"                          "200" "Projets"
check_page "/fr/projets/goodeworkers-website/"     "200" "GoodEWorkers Website"

# SEO wiring: every indexable page declares both language variants
check_page "/"                      "200" 'hreflang="fr" href="https://goodeworkers.org/fr/"'
check_page "/fr/"                   "200" 'hreflang="en" href="https://goodeworkers.org/"'
check_page "/legal-notice/"         "200" 'hreflang="fr" href="https://goodeworkers.org/fr/mentions-legales/"'
check_page "/fr/mentions-legales/"  "200" 'rel="canonical" href="https://goodeworkers.org/fr/mentions-legales/"'
check_page "/contributors/"         "200" 'hreflang="fr" href="https://goodeworkers.org/fr/contributeurs/"'
check_page "/contributors/r-ichard/" "200" 'hreflang="fr" href="https://goodeworkers.org/fr/contributeurs/r-ichard/"'
check_page "/fr/contributeurs/r-ichard/" "200" 'rel="canonical" href="https://goodeworkers.org/fr/contributeurs/r-ichard/"'
check_page "/projects/"                            "200" 'hreflang="fr" href="https://goodeworkers.org/fr/projets/"'
check_page "/projects/goodeworkers-website/"       "200" 'hreflang="fr" href="https://goodeworkers.org/fr/projets/goodeworkers-website/"'
check_page "/fr/projets/goodeworkers-website/"     "200" 'rel="canonical" href="https://goodeworkers.org/fr/projets/goodeworkers-website/"'

if [[ $fail -ne 0 ]]; then
  echo
  echo "Smoke test FAILED"
  exit 1
fi
echo
echo "Smoke test PASSED"
