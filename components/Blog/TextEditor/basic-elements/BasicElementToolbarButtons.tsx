// toolbar icons
import { LooksTwo } from "@styled-icons/material/LooksTwo";
import { Looks3 } from "@styled-icons/material/Looks3";
import { Looks4 } from "@styled-icons/material/Looks4";
import { FormatQuote } from "@styled-icons/material/FormatQuote";
import { Image } from "@styled-icons/material/Image";

// mark elements reference
import {
  BlockToolbarButton,
  ImageToolbarButton,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_BLOCKQUOTE,
  getPluginType,
} from "@udecode/plate";

// editor ref
import { useMyPlateEditorRef } from "../plateTypes";

export const BasicElementToolbarButtons = () => {
  const editor = useMyPlateEditorRef()!;

  return (
    <>
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H2)}
        icon={<LooksTwo />}
      />

      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H3)}
        icon={<Looks3 />}
      />

      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H4)}
        icon={<Looks4 />}
      />

      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_BLOCKQUOTE)}
        icon={<FormatQuote />}
      />

      <ImageToolbarButton icon={<Image />} />
    </>
  );
};
