import { extendTheme } from "@chakra-ui/react";
import Modal from "./components/modal";

const overrides = {
  components: {
    Modal,
  },
};

export default extendTheme(overrides);
