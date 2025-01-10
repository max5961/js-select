import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Styles } from "tuir";

type Args = {
    focusColor: string;
    blurColor: string;
    preSelectedName: string;
    preSelectedIndex: number;
    selection: "single" | "many";
    indent: number;
    indentBorder: boolean;
    windowSize: number;
    maximumWindow: boolean;
    centerScroll: boolean;
    fallthrough: boolean;
    navigation: "vi" | "arrow";
    scrollbar: boolean;
    scrollbarColor: string;
    viewport: boolean;
    underlineFocusText: boolean;
    underlineBlurText: boolean;
    italicFocusText: boolean;
    italicBlurText: boolean;
    dimFocusText: boolean;
    dimBlurText: boolean;
    boldFocusText: boolean;
    boldBlurText: boolean;
    displayProgress: boolean;
    dimProgress: boolean;
    italicProgress: boolean;
    boldProgress: boolean;
    progressColor: string;
} & Styles["Box"] &
    Styles["Text"] & {
        _: string[];
    };

export const args = yargs(hideBin(process.argv))
    .option("focusColor", {
        describe:
            "Color for focused item. Can be either a string like red or blue, or a hex code",
        type: "string",
        alias: ["color"],
        default: "cyan",
        requiresArg: true,
        // implies: ["section"], // require to be used with "section" flag
    })
    .option("blurColor", {
        describe: "Same as focusColor, but for non focused list items",
        type: "string",
        default: "",
        requiresArg: true,
    })
    .option("preSelectedName", {
        describe:
            "Starts focus on this item and displays a checkmark next to it",
        type: "string",
        requiresArg: true,
    })
    .option("preSelectedIndex", {
        describe:
            "Starts focus on this index and displays checkmark next to it",
        type: "number",
        requiresArg: true,
    })
    .option("selection", {
        describe:
            "If 'single', enter key chooses focused item.  If 'many' spacebar checks one or more item and enter key returns all checked",
        type: "string",
        choices: ["single", "many"],
        default: "single",
        requiresArg: true,
    })
    .option("indent", {
        describe: "How many spaces to indent list items",
        type: "number",
        default: 4,
        requiresArg: true,
    })
    .option("indentBorder", {
        describe:
            "When there is both an indent and a border, is the text indented or is the box indented?",
        type: "boolean",
        default: false,
        requiresArg: false,
    })
    .option("windowSize", {
        describe:
            "The amount of rows the list takes up regardless of how many list items",
        type: "number",
        default: 7,
        requiresArg: true,
    })
    .option("maximumWindow", {
        describe:
            "Slices window only when there aren't enough terminal rows available",
        type: "boolean",
        default: false,
        requiresArg: false,
    })
    .option("centerScroll", {
        describe: "Keeps focus in center of list if possible",
        type: "boolean",
        default: true,
        requiresArg: false,
    })
    .option("fallthrough", {
        describe: "Does navigation stop at start/end indexes or wrap around?",
        type: "boolean",
        default: false,
        requiresArg: false,
    })
    .option("navigation", {
        describe: "Key presses that trigger navigation",
        type: "string",
        choices: ["vi", "arrow"],
        default: "vi",
        requiresArg: true,
    })
    .option("borderStyle", {
        describe: "If defined, draws a border around list",
        type: "string",
        choices: [
            "round",
            "bold",
            "single",
            "double",
            "classic",
            "singleDouble",
            "doubleSingle",
        ] satisfies Styles["Box"]["borderStyle"][],
        requiresArg: true,
    })
    .option("borderColor", {
        describe: "Defines the border color",
        type: "string",
        default: "",
        requiresArg: true,
    })
    .option("scrollbar", {
        describe:
            "Show a scrollbar if more items than windowSize has space for",
        type: "boolean",
        default: false,
        requiresArg: false,
    })
    .option("scrollbarColor", {
        describe: "If scrollbar option is set, color the scrollbar",
        type: "string",
        requiresArg: true,
    })
    .option("displayProgress", {
        describe: "Display a '1/5' progress counter",
        type: "boolean",
        default: false,
        requiresArg: false,
    })
    .option("viewport", {
        describe:
            "When the command runs, use the entire terminal screen for display",
        type: "boolean",
        default: false,
        requiresArg: false,
    })
    .option("italicFocusText", {
        describe: "Applies italic style to focused text",
        type: "boolean",
        default: false,
        requiresArg: false,
    })
    .option("italicBlurText", {
        describe: "Applies italic style to blurred text",
        type: "boolean",
        default: false,
        requiresArg: false,
    })
    .option("dimFocusText", {
        describe: "Dims focused text",
        type: "boolean",
        default: false,
        requiresArg: false,
    })
    .option("dimBlurText", {
        describe: "Dims blurred text",
        type: "boolean",
        default: false,
        requiresArg: false,
    })
    .option("underlineFocusText", {
        describe: "Applies an underline to focused text",
        type: "boolean",
        default: false,
        requiresArg: false,
    })
    .option("underlineBlurText", {
        describe: "Applies an underline to blurred text",
        type: "boolean",
        default: false,
        requiresArg: false,
    })
    .option("boldFocusText", {
        describe: "Applies bold style to focused text",
        type: "boolean",
        default: false,
        requiresArg: false,
    })
    .option("boldBlurText", {
        describe: "Applies bold style to blurred text",
        type: "boolean",
        default: false,
        requiresArg: false,
    })
    .option("dimProgress", {
        describe: "Dims progress text",
        type: "boolean",
        default: false,
        requiresArg: false,
    })
    .option("italicProgress", {
        describe: "Applies italic style to progress text",
        type: "boolean",
        default: false,
        requiresArg: false,
    })
    .option("boldProgress", {
        describe: "Applies bold style to progress text",
        type: "boolean",
        default: false,
        requiresArg: false,
    })
    .option("progressColor", {
        describe: "Applies color to progress text",
        type: "string",
        default: "",
        requiresArg: true,
    })
    .parseSync() as Args;
