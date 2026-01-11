#!/usr/bin/env bash
set -euo pipefail

resolve_browser() {
  local candidate
  local env_candidates=(
    "${PUPPETEER_EXECUTABLE_PATH:-}"
    "${PDF_CHROME_BIN:-}"
    "${CHROME_BIN:-}"
    "${CHROMIUM_BIN:-}"
    "${GOOGLE_CHROME_BIN:-}"
  )

  for candidate in "${env_candidates[@]}"; do
    if [[ -n "$candidate" && -x "$candidate" ]]; then
      printf '%s' "$candidate"
      return 0
    fi
  done

  local names=(google-chrome google-chrome-stable chromium chromium-browser chrome)
  for candidate in "${names[@]}"; do
    if command -v "$candidate" >/dev/null 2>&1; then
      command -v "$candidate"
      return 0
    fi
  done

  local local_cache="${PUPPETEER_CACHE_DIR:-$HOME/.cache/puppeteer}"
  if [[ -d "$local_cache" ]]; then
    candidate="$(find "$local_cache" -type f -name chrome -perm -111 2>/dev/null | head -n 1 || true)"
    if [[ -n "$candidate" ]]; then
      printf '%s' "$candidate"
      return 0
    fi
  fi

  local local_chromium="$PWD/node_modules/puppeteer/.local-chromium"
  if [[ -d "$local_chromium" ]]; then
    candidate="$(find "$local_chromium" -type f -name chrome -perm -111 2>/dev/null | head -n 1 || true)"
    if [[ -n "$candidate" ]]; then
      printf '%s' "$candidate"
      return 0
    fi
  fi

  return 1
}

if [[ "${1:-}" == "--probe" ]]; then
  resolve_browser >/dev/null
  exit $?
fi

browser="$(resolve_browser || true)"
if [[ -z "$browser" ]]; then
  echo "No Chrome/Chromium executable found for PDF generation." >&2
  exit 1
fi

exec "$browser" --no-sandbox --disable-setuid-sandbox "$@"
