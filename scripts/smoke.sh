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
check_page "/remote-job-boards/"    "200" "We Work Remotely"

# French mirror
check_page "/fr/"                   "200" "les associations"
check_page "/fr/mentions-legales/"  "200" "Mentions légales"
check_page "/fr/no-such-page/"      "404" "Page introuvable"
check_page "/fr/thanks/"            "200" "GitHub"
check_page "/fr/offres-emploi-teletravail/" "200" "Filtrer par mot-clé"

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
check_page "/remote-job-boards/"    "200" 'hreflang="fr" href="https://goodeworkers.org/fr/offres-emploi-teletravail/"'
check_page "/fr/offres-emploi-teletravail/" "200" 'rel="canonical" href="https://goodeworkers.org/fr/offres-emploi-teletravail/"'
check_page "/remote-job-boards/"    "200" '"@type":"ItemList"'
check_page "/contributors/"         "200" 'hreflang="fr" href="https://goodeworkers.org/fr/contributeurs/"'
check_page "/contributors/r-ichard/" "200" 'hreflang="fr" href="https://goodeworkers.org/fr/contributeurs/r-ichard/"'
check_page "/fr/contributeurs/r-ichard/" "200" 'rel="canonical" href="https://goodeworkers.org/fr/contributeurs/r-ichard/"'
check_page "/projects/"                            "200" 'hreflang="fr" href="https://goodeworkers.org/fr/projets/"'
check_page "/projects/goodeworkers-website/"       "200" 'hreflang="fr" href="https://goodeworkers.org/fr/projets/goodeworkers-website/"'
check_page "/fr/projets/goodeworkers-website/"     "200" 'rel="canonical" href="https://goodeworkers.org/fr/projets/goodeworkers-website/"'
# Google tricks rows: the search URL is built from `query` and `searchPeriod`
check_page "/remote-job-boards/"    "200" 'google.com/search?q=%22remote%22+site%3Agreenhouse.io&tbs=qdr%3Ad'
check_page "/fr/offres-emploi-teletravail/" "200" 'Les quatre, via Google'

# Homepage body links to the job boards page (the footer link is separate)
# (lowercase anchor text: the footer link is capitalised)
check_page "/"                      "200" '>remote job boards</a>'
check_page "/fr/"                   "200" '>offres d&#39;emploi en télétravail</a>'

# Every link to another site opens in a new tab, with rel="noopener" and our
# utm_source: all of them go through src/components/ExternalLink.astro.
check_external_links() {
  local url="${BASE}$1" tag count=0 bad=0
  while IFS= read -r tag; do
    [[ -z "$tag" ]] && continue
    count=$((count + 1))
    if [[ "$tag" != *'target="_blank"'* || "$tag" != *'rel="noopener'* || "$tag" != *'utm_source='* ]]; then
      [[ $bad -eq 0 ]] && echo "FAIL $url external link without new tab, noopener or utm_source:"
      echo "      ${tag:0:160}"
      bad=$((bad + 1))
    fi
  done < <(curl -s "$url" | grep -oE '<a [^>]*href="https?://[^"]+"[^>]*>' | grep -v 'href="https://goodeworkers.org' || true)
  if [[ $bad -gt 0 ]]; then
    fail=1
  else
    echo "OK   $url ($count external links: new tab, noopener, utm_source)"
  fi
}

for path in / /fr/ /remote-job-boards/ /fr/offres-emploi-teletravail/ /legal-notice/ /thanks/; do
  check_external_links "$path"
done

if [[ $fail -ne 0 ]]; then
  echo
  echo "Smoke test FAILED"
  exit 1
fi
echo
echo "Smoke test PASSED"
