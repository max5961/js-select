#!/usr/bin/env bash

path=$(dirname $(realpath "$0"))
processID=$(echo $$)
file="/tmp/selection-$(echo $processID)"

FILE="$file" node "${path}/dist/root.js" "$@">/dev/tty

exitStatus="$?"

if [[ -f "$file" ]]; then
    cat "$file" && rm "$file" && exit "$exitStatus"
else
    exit 1
fi
