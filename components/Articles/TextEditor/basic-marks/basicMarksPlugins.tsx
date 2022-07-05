import {
  createBoldPlugin,
  createItalicPlugin,
  createStrikethroughPlugin,
  createUnderlinePlugin,
} from "@udecode/plate";

import { plateUI } from "../configs/plateUI";
import { createMyPlugins } from "../plateTypes";

export const basicMarksPlugins = createMyPlugins(
  [
    createBoldPlugin(),
    createItalicPlugin(),
    createStrikethroughPlugin(),
    createUnderlinePlugin(),
  ],
  {
    components: plateUI,
  }
);
