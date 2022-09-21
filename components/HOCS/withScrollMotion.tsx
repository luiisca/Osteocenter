import { motion } from "framer-motion";
/**
 * Provides subtle on-scroll animation
 */
const withScrollMotion =
  ({
    Element,
    direction = "y",
    variants = [60, 30, 0],
  }: {
    Element: any;
    direction?: string;
    variants?: Array<number>;
  }) =>
  /* eslint-disable react/display-name */
  ({ ...props }) => {
    const animation = {
      opacity: [0, 0, 1],
      [direction]: variants,
    };
    return (
      <motion.div
        initial={{ opacity: 0, [direction]: 40 }}
        whileInView={animation}
        transition={{ ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        <Element {...props} />
      </motion.div>
    );
  };

export default withScrollMotion;
