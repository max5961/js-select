#!/usr/bin/env bash

processID=$(echo $$)
file="./selection-$(echo $processID)"

FILE="$file" node ./dist/root.js "$@">/dev/tty

exitStatus="$?"

if [[ -f "$file" ]]; then
    cat "$file" && rm "$file" && exit "$exitStatus"
else
    echo "" && exit 1
fi
