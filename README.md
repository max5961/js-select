- _**js-select** is a menu making command-line utility that can be used as an
alternative to the builtin *select* command in bash.  It comes with vim
keybindings by default and allows for a reasonable amount of functionality and
styling customizations._
- _Written in TypeScript with
[tuir](https://github.com/max5961/tuir)._

# js-select
<!-- demo -->
https://github.com/user-attachments/assets/3d6d632c-b947-4d5a-b1bf-03df6d668009

---

## Install

```sh
sudo npm install -g @mmorrissey5961/js-select
```
or
```sh
git clone https://github.com/max5961/js-select
cd js-select && npm install && npm run deploy
```

---

#### Command line options
```
js-select --help
```

---

#### Example

```sh
echo "Select a directory to cd into:"

selection=$(js-select $(pwd)/* \
        "--focusColor=red" \
        "--underlineFocusText" \
        "--blurColor=red" \
        "--dimBlurText" \
        "--borderStyle=round" \
        "--displayProgress" \
        "--indentBorder"
)

[[ -d "$selection" ]] && cd "$selection"
```

---

#### Selecting One vs Many Menu items

- When set to `single`, pressing enter on the focused item will print just that
  item to stdout.
- When set to `many`, pressing space on the focused item toggles it as checked
  or not.  Pressing enter prints out all of the checked items separated by new
  lines charachters.
- default: `single`

```sh
echo "Select a single option:"

selection=$(js-select a b c d --selection=single)

echo "You have selected: $selection"
```

```sh
echo "Select options:"

selection=$(js-select a b c d --selection=many)

echo "You have selected: $selection"
```
---

#### Pre-selecting Items

In the event that you want your menu to convey that one or more of the menu
items has some special meaning.  For example, you want to make a script that
changes a setting, it would also be nice to see what setting you had previously.
These flags put a `✔` next to all pre-selected item.

The initial focus of the menu will also be the first item in the pre-selected
array.

_Both examples pre-select **c** and **d**._

```sh
selection=$(js-select a b c d --preSelectedNames c d --selection=many)
```

```sh
selection=$(js-select a b c d --preSelectedIndexes 2 3 --selection=many)
```

---

#### Style and Function Options

`NOTE:` All color options can be set to a string (i.e `blue`) or a `HEX` color.

- Focus and blur color can be set with the `--focusColor` and `--blurColor` flags.
- The size of the viewing window can be set with the `--windowSize` and
  `--maximumWindow` flags.  By default the windowSize is set to `7`. The
  --maximumWindow flag sets the window to the maximum amount of terminal rows
  available.
- Navigation keybindings can be set with the `--navigation` to either `vi` or
  `arrow`.
- Exit keybinds can be set with `--quitOnQ` and `--quitOnEsc`.  Both are true by
  default
- Scrolling behavior can be set with `--centerScroll` and `--fallthrough`
- Scrollbar can be set with `--scrollbar` and its color set with
  `--scrollbarColor`
- Wipe the entire screen to display the menu with `--viewport`
- Further style with:
    - `--underlineFocusText`
    - `--underlineBlurText`
    - `--italicFocusText`
    - `--italicBlurText`
    - `--dimFocusText`
    - `--dimBlurText`
    - `--boldFocusText`
    - `--boldBlurText`
    - `--italicProgress`
    - `--dimProgress`
    - `--boldProgress`
    - `--progressColor`


---
#### Error handling

Especially if your script contains multiple menus, it might be advisable to
check for captured output with something like this:

```sh
[[ ! "$selection" ]] && exit 1
```

If the user sends a SIGINT during a menu, this ensures your script doesn't
continue running additional menus, which would be frustrating if your intention
was to exit the script.
