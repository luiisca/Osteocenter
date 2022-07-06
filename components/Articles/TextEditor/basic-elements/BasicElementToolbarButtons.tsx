// toolbar icons
import { FormatQuote } from "@styled-icons/material/FormatQuote";
import { Looks3 } from "@styled-icons/material/Looks3";
import { LooksOne } from "@styled-icons/material/LooksOne";
import { LooksTwo } from "@styled-icons/material/LooksTwo";

// mark elements reference
import {
  BlockToolbarButton,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  getPluginType,
} from "@udecode/plate";

// editor ref
import { useMyPlateEditorRef } from "../plateTypes";

export const BasicElementToolbarButtons = () => {
  const editor = useMyPlateEditorRef()!;

  return (
    <>
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H1)}
        icon={<LooksOne />}
      />

      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H2)}
        icon={<LooksTwo />}
      />

      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H3)}
        icon={<Looks3 />}
      />

      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_BLOCKQUOTE)}
        icon={<FormatQuote />}
      />
    </>
  );
};
