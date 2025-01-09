import React, { useMemo } from "react";
import {
    Box,
    List,
    Text,
    useApp,
    useKeymap,
    useList,
    useListItem,
    Viewport,
} from "tuir";
import fs from "node:fs/promises";

type Props = {
    FILE: string;
    list: string[];
    color?: string;
    selectedIndex?: number;
    selectedName?: string;
    border?: boolean;
    viewport?: boolean;
};

export default function App(props: Props): React.ReactNode {
    const startIndex = useMemo<number>(() => {
        if (props.selectedIndex !== undefined) return props.selectedIndex;
        if (props.selectedName) {
            return props.list.findIndex((name) => name === props.selectedName);
        }
        return 0;
    }, []);

    const { listView, items, control } = useList(props.list, {
        centerScroll: true,
        startIndex: startIndex,
    });

    const count = `${control.currentIndex + 1}/${items.length}`;

    const content = (
        <Box
            height={Math.min(
                7,
                items.length + (props.border ? 2 : 0),
                process.stdout.rows,
            )}
            borderStyle={props.border ? "round" : undefined}
            titleTopLeft={{ title: props.border ? count : "" }}
        >
            <List listView={listView} scrollbar={{ hide: true }}>
                {items.map((_, idx) => {
                    return (
                        <Item key={idx} startIndex={startIndex} {...props} />
                    );
                })}
            </List>
        </Box>
    );

    if (props.viewport) {
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

function Item(props: Props & { startIndex: number }): React.ReactNode {
    const { exit } = useApp();
    const { isFocus, item, index } = useListItem();

    let textContent = `   ${isFocus ? "> " : "  "}${item}`;
    const color = isFocus ? props.color : undefined;

    if (props.selectedName || props.selectedIndex !== undefined) {
        if (props.startIndex === index) {
            textContent += " ✔";
        }
    }

    const { useEvent } = useKeymap({ choose: { key: "return" } });

    useEvent("choose", async () => {
        await fs.writeFile(props.FILE, item, { encoding: "utf-8" });
        exit();
    });

    return <Text color={color}>{textContent}</Text>;
}
