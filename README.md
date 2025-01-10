### js-select

---

A menu making command-line utility designed to be a more practical and modern
alternative to the built in *select* bash command.  Written in TypeScript with
[tuir](https://github.com/max5961/tuir).  Comes with vi keybindings by default
and allows for a reasonable amount of other customizations.

### Install

```sh
sudo npm install -g @mmorrissey5961/js-select
```
or
```sh
git clone https://github.com/max5961/js-select
cd js-select && npm install && npm run deploy
```

### Usage
```
js-select --help
```

### Example
```
echo "Select a Darkthrone album:"

selection=$(js-select \
        "Soulside Journey" \
        "A Blaze In The Northern Sky" \
        "Under a Funeral Moon" \
        "Transilvanian Hunger" \
        "Astral Fortress" \
        "--focusColor=red" \
        "--preSelectedName='Under a Funeral Moon'" \
        "--borderStyle=round" \
        "--displayProgress" \
        "--indentBorder"
)

echo "You have selected: $selection"
```

---

### --selection [string] [choices: "single", "many"] [default: "single"]

- **single**
    - When **enter** is pressed, only the focused text is written to stdout.
- **many**
    - When **spacebar** is pressed, the focused text is toggled as checked.
      Toggle as many items as desired.  Then, when **enter** is pressed, all of
      the checked items are written to stdout separated by **\n** chars.

---

### Pre-selecting an item (--preSelectedName, --preSelectedIndex)

In the event that you want your menu to convey that one of the menu items has
some special meaning.  For example, you want to make a script that changes a
setting, it would also be nice to see what setting you had previously.  These
flags put a checkmark next to the pre-selected item and shift the initial focus
to that item.

- **--preSelectedName** [string]
- **--preSelectedIndex** [number]

---

### Error handling

Especially if your script contains multiple menus, it would be advisable to
check for captured output with something like this:

```sh
[[ ! "$selection" ]] && exit 1

```

Imagine your script has multiple calls to *js-select*.  If you SIGINT during the
first one, that only kills the process that spawned the menu, and your
subsequent menus will still spawn unless you end the script, which would be
quite annoying.











