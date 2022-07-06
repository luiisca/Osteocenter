import { HeadingToolbar, withPlateEventProvider } from "@udecode/plate";

export const Toolbar = withPlateEventProvider((props: any) => (
  <HeadingToolbar {...props} />
));
