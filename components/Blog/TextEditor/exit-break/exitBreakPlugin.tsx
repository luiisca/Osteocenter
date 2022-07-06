import {
  ExitBreakPlugin,
  KEYS_HEADING,
  ELEMENT_IMAGE,
  ELEMENT_PARAGRAPH,
  ELEMENT_H1,
  ELEMENT_MENTION,
} from "@udecode/plate";
import { MyPlatePlugin } from "../plateTypes";

export const exitBreakPlugin: Partial<MyPlatePlugin<ExitBreakPlugin>> = {
  options: {
    rules: [
      {
        // default behavior break to the next line
        hotkey: "mod+enter",
      },
      {
        // break to the previous line
        hotkey: "mod+shift+enter",
        before: true,
      },
      {
        // if cursor at start of the block break to previous line
        // if end break to next line
        hotkey: "enter",
        query: {
          start: true,
          end: true,
          allow: KEYS_HEADING.filter((heading) => heading !== "h1"),
        },
      },
      {
        hotkey: "enter",
        query: {
          start: false,
          end: true,
          allow: [ELEMENT_H1],
        },
      },
      {
        // break on images' captions when enter
        hotkey: "enter",
        query: {
          allow: [ELEMENT_IMAGE],
        },
      },
      {
        // same as second but also for paragraphs
        hotkey: "enter",
        before: true,
        query: {
          start: true,
          allow: [ELEMENT_PARAGRAPH],
        },
      },
    ],
  },
};
