import React from "react";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { preserveScreen, render } from "tuir";
import App from "./App.js";

async function begin() {
    const args = await yargs(hideBin(process.argv))
        .option("color", {
            alias: ["c"],
            describe: "Color for selection item",
            type: "string",
            // implies: ["section"], // require to be used with "section" flag
            requiresArg: true,
        })
        .option("selected-index", {
            describe: "The already selected list item index",
            type: "number",
            requiresArg: true,
        })
        .option("selected-name", {
            describe: "The already selected list item name",
            type: "string",
            requiresArg: true,
        })
        .option("border", {
            describe: "Bar at top of list displaying count",
            type: "boolean",
            requiresArg: false,
        })
        .option("viewport", {
            describe: "Use viewport",
            type: "boolean",
            requiresArg: false,
        })
        .parse();

    if (!args._.length) process.exit();

    if (args.viewport) {
        preserveScreen();
    }

    const FILE = process.env.FILE!;

    render(
        <App
            FILE={FILE}
            border={args.border}
            list={args._.map((li) => `${li}`)}
            color={args.color ?? "blue"}
            selectedIndex={args.selectedIndex}
            selectedName={args.selectedName}
            viewport={args.viewport}
        />,
    );
}

begin();
