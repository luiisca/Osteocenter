import {
  ELEMENT_H1,
  ELEMENT_PARAGRAPH,
  withPlaceholders,
} from "@udecode/plate";

export const withStyledPlaceHolders = (components: any) =>
  withPlaceholders(components, [
    {
      key: ELEMENT_H1,
      placeholder: "Titulo",
      hideOnBlur: false,
    },
    {
      key: ELEMENT_PARAGRAPH,
      placeholder: "Introducir texto",
      hideOnBlur: true,
    },
  ]);
