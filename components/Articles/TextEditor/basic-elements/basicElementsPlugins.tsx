import {
  createBlockquotePlugin,
  createHeadingPlugin,
  createParagraphPlugin,
} from "@udecode/plate";

import { plateUI } from "../configs/plateUI";
import { createMyPlugins } from "../plateTypes";

export const basicElementsPlugins = createMyPlugins(
  [createBlockquotePlugin(), createHeadingPlugin(), createParagraphPlugin()],
  {
    components: plateUI,
  }
);
