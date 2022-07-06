import { createMyPlugins } from "../plateTypes";
import { basicElementsPlugins } from "../basic-elements/basicElementsPlugins";
import { plateUI } from "../configs/plateUI";
import { basicMarksPlugins } from "../basic-marks/basicMarksPlugins";

export const basicNodesPlugins = createMyPlugins(
  [...basicElementsPlugins, ...basicMarksPlugins],
  {
    components: plateUI,
  }
);
