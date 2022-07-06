// libraries + types
import { Plate, createExitBreakPlugin } from "@udecode/plate";
import { MyValue, createMyPlugins } from "./plateTypes";

// configs + basics
import { basicNodesPlugins } from "./basic-nodes/basicNodesPlugins";
import { BasicElementToolbarButtons } from "./basic-elements/BasicElementToolbarButtons";
import { exitBreakPlugin } from "./exit-break/exitBreakPlugin";
import { editableProps } from "./configs/editablesProps";
import { plateUI } from "./configs/plateUI";

// components
import { Toolbar } from "./toolbar/Toolbar";
import { MarkBallonToolbar } from "./balloon-toolbar/MarkBalloonToolbar";
import { withStyledPlaceHolders } from "./placeholder/withStyledPlaceHolders";

const components = withStyledPlaceHolders(plateUI);
const plugins = createMyPlugins(
  [...basicNodesPlugins, createExitBreakPlugin(exitBreakPlugin)],
  {
    components,
  }
);

const TextEditor = ({
  initialContent,
  setFieldValue,
}: {
  initialContent: any;
  setFieldValue: any;
}) => {
  return (
    <>
      <Toolbar>
        <BasicElementToolbarButtons />
      </Toolbar>

      <Plate<MyValue>
        editableProps={editableProps}
        plugins={plugins}
        initialValue={initialContent}
        onChange={(newValue) => setFieldValue("content", newValue)}
      >
        <MarkBallonToolbar />
      </Plate>
    </>
  );
};

export default TextEditor;
