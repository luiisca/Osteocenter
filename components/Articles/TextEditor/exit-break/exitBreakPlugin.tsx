import { ExitBreakPlugin, KEYS_HEADING } from "@udecode/plate";
import { MyPlatePlugin } from "../plateTypes";

export const exitBreakPlugin: Partial<MyPlatePlugin<ExitBreakPlugin>> = {
  options: {
    rules: [
      {
        // default behavior break to the next line
        hotkey: "mod+enter",
      },
      // {
      //   // break to the previous line
      //   hotkey: 'mod+shift+enter',
      //   before: true,
      // },
      {
        // if cursor at start of the block break to previous line
        // if end break to next line
        hotkey: "enter",
        query: {
          start: true,
          end: true,
          allow: KEYS_HEADING,
        },
      },
    ],
  },
};
