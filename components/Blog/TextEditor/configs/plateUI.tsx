import {
  createPlateUI,
  withProps,
  StyledElement,
  StyledLeaf,
  ELEMENT_H1,
  ELEMENT_CODE_BLOCK,
} from "@udecode/plate";

export const plateUI = createPlateUI({
  [ELEMENT_CODE_BLOCK]: null as any,
  [ELEMENT_H1]: withProps(StyledElement, {
    as: "h1",
  }),
});
