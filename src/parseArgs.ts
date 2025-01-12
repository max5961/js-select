import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Styles } from "tuir";

type Args = {
    selection: "single" | "many";
    preSelectedNames: string[];
    preSelectedIndexes: number[];
    navigation: "vi" | "arrow";
    quitOnQ: boolean;
    quitOnEsc: boolean;
    focusColor: string;
    blurColor: string;
    windowSize: number;
    maximumWindow: boolean;
    indent: number;
    centerScroll: boolean;
    fallthrough: boolean;
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
    })
    .option("blurColor", {
        describe: "Same as focusColor, but for blurred menu items",
        type: "string",
        default: "",
        requiresArg: true,
    })
    .option("preSelectedNames", {
        describe:
            "Starts focus on the first selected and displays a checkmark next to all selected",
        type: "string",
        array: true,
        requiresArg: true,
    })
    .option("preSelectedIndexes", {
        describe:
            "Starts focus on the first selected and displays checkmark next to all selected",
        type: "number",
        array: true,
        requiresArg: true,
    })
    .option("quitOnQ", {
        describe: "Exits the process when the 'q' key is pressed",
        type: "boolean",
        default: true,
        requiresArg: false,
    })
    .option("quitOnEsc", {
        describe: "Exits the process when the ESC key is pressed",
        type: "boolean",
        default: true,
        requiresArg: false,
    })
    .option("selection", {
        describe:
            "If 'single', enter key chooses focused item.  If 'many' spacebar checks one or more items and enter chooses all checked",
        type: "string",
        choices: ["single", "many"],
        default: "single",
        requiresArg: true,
    })
    .option("indent", {
        describe: "How many spaces to indent the menu",
        type: "number",
        default: 4,
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
        describe: "Keeps focus in center of menu if possible",
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
        describe:
            "Display a '1/5' style progress counter in the top left corner",
        type: "boolean",
        default: false,
        requiresArg: false,
    })
    .option("viewport", {
        describe:
            "Use the entire terminal screen for display. Also enables mouse scroll/click",
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
