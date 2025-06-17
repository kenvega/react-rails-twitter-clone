#!/usr/bin/env bash
set -euo pipefail # fail fast flags

FILE=".metrics/total_lines_added.txt"
mkdir -p .metrics

# Get current total (if any)
total=0
[[ -f "$FILE" ]] && read -r total < "$FILE"

# Lines that will be added by *this* commit
added=$(git diff --cached --numstat | awk '{sum += $1} END {print sum}')

# If nothing new is staged, exit quietly so other hooks can run
[[ "$added" -eq 0 ]] && exit 0

# Write updated cumulative total
new_total=$((total + added))
echo "$new_total" > "$FILE"

# OPTIONAL progress message
echo "Added $added lines |  New total is $new_total"

# stages the updated metric file
git add "$FILE"
