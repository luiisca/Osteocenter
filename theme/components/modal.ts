import type { ComponentStyleConfig } from "@chakra-ui/theme";

const modalTheme: ComponentStyleConfig = {
  parts: ["dialog"],
  variants: {
    base: {
      dialog: {
        maxW: "full",
        m: 4,
      },
    },
    lg: {
      dialog: {
        maxW: "850px",
      },
    },
    xl: {
      dialog: {
        maxW: "1000px",
      },
    },
  },
};

export default modalTheme;
