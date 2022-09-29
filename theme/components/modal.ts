import type { ComponentStyleConfig } from "@chakra-ui/theme";

const modalTheme: ComponentStyleConfig = {
  parts: ["dialog"],
  sizes: {
    "7xl": {
      dialog: {
        maxW: "1300px",
      },
    },
  },
};

export default modalTheme;
