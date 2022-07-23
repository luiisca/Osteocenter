import { Divider as ChakraDivider } from "@chakra-ui/react";
import tw, { styled } from "twin.macro";
export const ContentGrid = ({ children }: { children: React.ReactNode }) => (
  <div tw="md:grid md:grid-cols-[60% 40%] blog-lg:grid-cols-[70% 30%]">
    {children}
  </div>
);

export const Divider = styled(ChakraDivider)(() => [
  tw`bg-[hsla(0,0%,78%,.37)] `,
]);
