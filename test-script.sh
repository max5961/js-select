#!/usr/bin/env bash

# echo "Select a music dir"

# dirs=()
# for path in $HOME/Music/*; do
#     dirs+=$(basename "$path ");
# done
#
# selection=$(js-select $dirs --color=red --border)
#
# echo "You have selected album: $selection"
#
a="A Blaze In The Northern Sky"
b="Soulside Journey"
c="Transilvanian Hunger"
d="Under A Funeral Moon"

echo "Select a Darkthrone album"

selection=$(js-select \
        "Soulside Journey" \
        "A Blaze In The Northern Sky" \
        "Under a Funeral Moon" \
        "Transilvanian Hunger" \
        "Panzerfaust" \
        "Total Death" \
        "Goatlord" \
        "Ravishing Grimness" \
        "Plaguewielder" \
        "Hate Them" \
        "Sardonic Wrath" \
        "The Cult Is Alive" \
        "F.O.A.D." \
        "Dark Thrones and Black Flags" \
        "Circle the Wagons" \
        "The Underground Resistance" \
        "Arctic Thunder" \
        "Old Star" \
        "Eternal Hails......" \
        "Astral Fortress" \
        "--focusColor=red" \
        "--preSelectedName=$c" \
        "--borderStyle=round" \
    )

echo "You have selected: $selection"

echo "Now select a song"
if [[ "$selection" == "$a" ]]; then
    song=$(js-select \
            "Kathaarian Life Code" \
            "In the Shadow of the Horns" \
            "Paragon Belial" \
            "Where Cold Winds Blow" \
            "Darkthrone 'A Blaze in the Northern Sky'" \
            "The Pagan Winter" \
            "--focusColor=green" \
            "--borderStyle=round" \
        )
    echo "You have selected: $song"
fi
