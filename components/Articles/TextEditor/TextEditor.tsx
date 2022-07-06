// libraries + types
import { useRef, CSSProperties } from "react";
import { CursorOverlayContainer } from "./cursor-overlay/CursorOverlayContainer";
import {
  Plate,
  createExitBreakPlugin,
  createSoftBreakPlugin,
} from "@udecode/plate";
import { MyValue, createMyPlugins } from "./plateTypes";

// configs + basics
import { basicNodesPlugins } from "./basic-nodes/basicNodesPlugins";
import { BasicElementToolbarButtons } from "./basic-elements/BasicElementToolbarButtons";
import { exitBreakPlugin } from "./exit-break/exitBreakPlugin";
import { softBreakPlugin } from "./soft-break/softBreakPlugin";
import { editableProps } from "./configs/editablesProps";
import { plateUI } from "./configs/plateUI";

// components
import { Toolbar } from "./toolbar/Toolbar";
import { MarkBallonToolbar } from "./balloon-toolbar/MarkBalloonToolbar";
import { withStyledPlaceHolders } from "./placeholder/withStyledPlaceHolders";
import { dragOverCursorPlugin } from "./cursor-overlay/dragOverCursorPlugin";

const styles: Record<string, CSSProperties> = {
  wrapper: {
    position: "relative",
  },
};

const components = withStyledPlaceHolders(plateUI);

const plugins = createMyPlugins(
  [
    ...basicNodesPlugins,
    createExitBreakPlugin(exitBreakPlugin),
    createSoftBreakPlugin(softBreakPlugin),
    dragOverCursorPlugin,
  ],
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
  const ref = useRef(null);
  return (
    <div ref={ref} style={styles.wrapper}>
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
        <CursorOverlayContainer containerRef={ref} />
      </Plate>
    </div>
  );
};

export default TextEditor;
