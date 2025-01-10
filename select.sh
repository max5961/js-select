#!/usr/bin/env bash

processID=$(echo $$)
file="./selection-$(echo $processID)"

FILE="$file" node ./dist/root.js "$@">/dev/tty

if [[ -f "$file" ]]; then
    cat "$file" && rm "$file"
fi

