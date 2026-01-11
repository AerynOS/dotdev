#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST_DIR="$ROOT_DIR/dist"
DOCS_DIR="$ROOT_DIR/src/content/docs"
preview_pid=""

if [[ ! -d "$DIST_DIR" ]]; then
  echo "dist folder not found at $DIST_DIR. Run the build first."
  exit 1
fi

slugify_segment() {
  local segment="$1"
  segment="$(printf '%s' "$segment" | tr '[:upper:]' '[:lower:]')"
  segment="$(printf '%s' "$segment" | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//')"
  printf '%s' "$segment"
}

slugify_path() {
  local input="$1"
  local segment
  local slug=""
  IFS='/' read -r -a parts <<< "$input"
  for segment in "${parts[@]}"; do
    if [[ -z "$segment" || "$segment" == "." ]]; then
      continue
    fi
    local slug_segment
    slug_segment="$(slugify_segment "$segment")"
    if [[ -n "$slug" ]]; then
      slug="$slug/$slug_segment"
    else
      slug="$slug_segment"
    fi
  done
  printf '%s' "$slug"
}

copy_markdown() {
  local file rel base dir name slug_dir slug_name dest
  while IFS= read -r -d '' file; do
    rel="${file#$DOCS_DIR/}"
    base="${rel%.*}"
    dir="$(dirname "$base")"
    name="$(basename "$base")"

    if [[ "$name" == "index" ]]; then
      if [[ "$dir" == "." ]]; then
        dest="$DIST_DIR/index.md"
      else
        slug_dir="$(slugify_path "$dir")"
        dest="$DIST_DIR/$slug_dir.md"
      fi
    else
      if [[ "$dir" == "." ]]; then
        slug_dir=""
      else
        slug_dir="$(slugify_path "$dir")"
      fi
      slug_name="$(slugify_segment "$name")"
      if [[ -n "$slug_dir" ]]; then
        dest="$DIST_DIR/$slug_dir/$slug_name.md"
      else
        dest="$DIST_DIR/$slug_name.md"
      fi
    fi

    mkdir -p "$(dirname "$dest")"
    cp "$file" "$dest"
  done < <(find "$DOCS_DIR" -type f \( -name '*.md' -o -name '*.mdx' \) -print0)
}

generate_pdf() {
  if [[ "${SKIP_PDF:-}" == "1" ]]; then
    echo "Skipping PDF generation (SKIP_PDF=1)."
    return
  fi

  local host="${PDF_HOST:-127.0.0.1}"
  local port="${PDF_PORT:-4321}"
  local url="${PDF_URL:-http://$host:$port}"

  npm run preview -- --host "$host" --port "$port" >/tmp/astro-preview.log 2>&1 &
  preview_pid=$!

  cleanup_preview() {
    if [[ -n "${preview_pid:-}" ]]; then
      kill "$preview_pid" 2>/dev/null || true
      wait "$preview_pid" 2>/dev/null || true
    fi
  }
  trap cleanup_preview EXIT

  for _ in {1..30}; do
    if curl -fs "$url" >/dev/null 2>&1; then
      break
    fi
    sleep 1
  done

  if ! curl -fs "$url" >/dev/null 2>&1; then
    echo "Preview server failed to start."
    exit 1
  fi

  local pdf_cmd="starlight-to-pdf"
  if ! command -v starlight-to-pdf >/dev/null 2>&1; then
    pdf_cmd="npx starlight-to-pdf"
  fi

  local pdf_args=("$url" --contents-links internal --filename aerynos --path "$DIST_DIR")
  local browser_exec="${PDF_BROWSER_EXECUTABLE:-}"
  if [[ -z "$browser_exec" && ("${CI:-}" == "true" || "${GITHUB_ACTIONS:-}" == "true") ]]; then
    local wrapper="$ROOT_DIR/scripts/chromium-no-sandbox.sh"
    if [[ -x "$wrapper" ]] && "$wrapper" --probe; then
      browser_exec="$wrapper"
    fi
  fi
  if [[ -n "$browser_exec" ]]; then
    pdf_args+=(--browser-executable "$browser_exec")
  fi

  $pdf_cmd "${pdf_args[@]}"
}

copy_markdown
generate_pdf
