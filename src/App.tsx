import React, { useEffect, useMemo } from "react";
import {
    Box,
    List,
    preserveScreen,
    setMouseReporting,
    Text,
    useApp,
    useKeymap,
    useList,
    useListItem,
    Viewport,
} from "tuir";
import fs from "node:fs/promises";
import { args } from "./parseArgs.js";
import { randomUUID } from "node:crypto";

const LIST = args._.map((arg) => {
    return { id: randomUUID(), value: arg, checked: false };
});
const FILE = process.env.FILE!;

if (!LIST.length) {
    process.exit();
}

if (
    args.viewport ||
    (LIST.length >= process.stdout.rows && args.maximumWindow)
) {
    preserveScreen();
    setMouseReporting(true);
}

export default function App(): React.ReactNode {
    // Get start index
    const startIndex = useMemo<number>(() => {
        if (args.preSelectedIndex !== undefined) return args.preSelectedIndex;
        if (args.preSelectedName) {
            return LIST.findIndex((arg) => arg.value === args.preSelectedName);
        }
        return 0;
    }, []);

    const { listView, items, control } = useList(LIST, {
        startIndex: startIndex,
        centerScroll: args.centerScroll,
        fallthrough: args.fallthrough,
        navigation: args.navigation === "vi" ? "vi-vertical" : "arrow-vertical",
    });

    const progress = `${control.currentIndex + 1}/${items.length}`;
    let height =
        Math.min(LIST.length, args.windowSize, process.stdout.rows) +
        (args.borderStyle && process.stdout.rows > 2
            ? 2
            : args.displayProgress
              ? process.stdout.rows > 1
                  ? 1
                  : 0
              : 0);

    if (args.maximumWindow) {
        height = Math.min(LIST.length, process.stdout.rows);
    }

    const content = (
        <Box marginLeft={args.indentBorder ? args.indent : 0}>
            <Box
                height={height}
                borderStyle={args.borderStyle}
                borderColor={args.borderColor}
                titleTopLeft={{
                    title: args.displayProgress ? progress : "",
                    color: args.progressColor,
                    italic: args.italicProgress,
                    dimColor: args.dimProgress,
                    bold: args.boldProgress,
                }}
                onScrollDown={() => {
                    control.scrollDown(5);
                }}
                onScrollUp={() => {
                    control.scrollUp(5);
                }}
            >
                <List listView={listView} scrollbar={{ hide: true }}>
                    {items.map((item) => {
                        return <Item key={item.id} startIndex={startIndex} />;
                    })}
                </List>
            </Box>
        </Box>
    );

    if (args.viewport) {
        return (
            <Viewport
                justifyContent="center"
                alignItems="center"
                padding={
                    process.stdout.rows > 25 && process.stdout.columns > 50
                        ? 10
                        : 0
                }
            >
                {content}
            </Viewport>
        );
    }

    return content;
}

type Props = {
    startIndex: number;
};

function Item({ startIndex }: Props): React.ReactNode {
    const { exit } = useApp();
    const { isFocus, item, items, setItems, index } =
        useListItem<typeof LIST>();

    useEffect(() => {
        if (args.preSelectedName || args.preSelectedIndex !== undefined) {
            if (startIndex === index) {
                const copy = items.slice();
                copy[index] = { ...item, checked: true };
                setItems(copy);
            }
        }
    }, []);

    const { useEvent } = useKeymap({
        choose: { key: "return" },
        check: { input: " " },
        quitOnQ: { input: "q" },
        quitOnEsc: { key: "esc" },
    });

    useEvent("choose", choose);
    useEvent("check", check);
    useEvent("quitOnQ", () => {
        args.quitOnQ && exit();
    });
    useEvent("quitOnEsc", () => {
        args.quitOnEsc && exit();
    });

    async function choose(): Promise<void> {
        if (args.selection === "single") {
            await fs.writeFile(FILE, item.value, { encoding: "utf-8" });
        } else {
            const allChecked = items
                .filter((item) => item.checked)
                .map((item) => item.value)
                .join("\n");
            await fs.writeFile(FILE, allChecked, { encoding: "utf-8" });
        }
        exit();
    }

    function check(): void {
        if (args.selection === "many") {
            const copy = items.slice();
            copy[index] = { ...item, checked: !item.checked };
            setItems(copy);
        }
    }

    const color = isFocus ? args.focusColor : args.blurColor;
    const underline = isFocus
        ? args.underlineFocusText
        : args.underlineBlurText;
    const dim = isFocus ? args.dimFocusText : args.dimBlurText;
    const bold = isFocus ? args.boldFocusText : args.boldBlurText;
    const italic = isFocus ? args.italicFocusText : args.italicBlurText;

    let textContent = `${isFocus ? "> " : "  "}${item.value} ${item.checked ? "✔" : " "}`;
    if (args.indent && !args.indentBorder) {
        textContent = `${" ".repeat(args.indent)}${textContent}`;
    }

    return (
        <Box width="100" onClick={choose} onRightClick={check}>
            <Text
                color={color}
                underline={underline}
                dimColor={dim}
                bold={bold}
                italic={italic}
            >
                {textContent}
            </Text>
        </Box>
    );
}
