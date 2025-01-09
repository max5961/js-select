#!/usr/bin/env bash

processID=$(echo $$)
file="/tmp/js-select-$(echo $processID)"

FILE="$file" node ./dist/root.js "$@">/dev/tty

if [[ -f "$file" ]]; then
    cat "$file" && rm "$file"
fi

