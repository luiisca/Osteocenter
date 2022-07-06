import { Plate } from "@udecode/plate";
import { MyValue } from "./plateTypes";

import { basicNodesPlugins } from "./basic-nodes/basicNodesPlugins";
import { BasicElementToolbarButtons } from "./basic-elements/BasicElementToolbarButtons";
import { editableProps } from "./configs/editablesProps";

import { Toolbar } from "./toolbar/Toolbar";
import { MarkBallonToolbar } from "./balloon-toolbar/MarkBalloonToolbar";

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
        plugins={basicNodesPlugins}
        initialValue={initialContent}
        onChange={(newValue) => setFieldValue("content", newValue)}
      >
        <MarkBallonToolbar />
      </Plate>
    </>
  );
};

export default TextEditor;
