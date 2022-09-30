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
        maxW: "750px",
      },
    },
    xl: {
      dialog: {
        maxW: "1000px",
      },
    },
    "2xl": {
      dialog: {
        maxW: "1300px",
      },
    },
  },
};

export default modalTheme;
