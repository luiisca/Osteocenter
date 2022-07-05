import {
  BalloonToolbar,
  getPluginType,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  MarkToolbarButton,
} from "@udecode/plate";

import { useMyPlateEditorRef } from "../plateTypes";
import { TippyProps } from "@tippyjs/react";

import { FormatBold } from "@styled-icons/material/FormatBold";
import { FormatItalic } from "@styled-icons/material/FormatItalic";
import { FormatUnderlined } from "@styled-icons/material/FormatUnderlined";

export const MarkBallonToolbar = () => {
  const editor = useMyPlateEditorRef()!;
  const arrow = false;
  const theme = "dark";

  // tippy.js tooltip options
  const tooltip: TippyProps = {
    arrow: true,
    delay: 0,
    duration: [200, 0],
    hideOnClick: false,
    offset: [0, 17],
    placement: "top",
  };

  return (
    <BalloonToolbar theme={theme} arrow={arrow}>
      <MarkToolbarButton
        type={getPluginType(editor, MARK_BOLD)}
        icon={<FormatBold />}
        tooltip={tooltip}
      />

      <MarkToolbarButton
        type={getPluginType(editor, MARK_ITALIC)}
        icon={<FormatItalic />}
        tooltip={tooltip}
      />

      <MarkToolbarButton
        type={getPluginType(editor, MARK_UNDERLINE)}
        icon={<FormatUnderlined />}
        tooltip={tooltip}
      />
    </BalloonToolbar>
  );
};
