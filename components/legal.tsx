import NextLink from "next/link";
import BaseHeading from "@/components/Elements/Heading";
import { BaseContainer } from "@/components/BaseStyle";
import tw, { styled } from "twin.macro";

export const Container = tw(BaseContainer)`mt-12 md:mt-20`;
export const Heading = tw(BaseHeading)`font-sans text-xl`;
export const List = tw.ul`list-disc ml-6`;
export const Text = styled.p(() => [
  tw`text-[#525252] text-[.95rem] leading-[1.575rem] mb-5 tracking-[0.02px] font-normal max-w-[75ch]`,
  tw`md:text-lg md:leading-[1.875rem] md:mb-7`,
]);
export const Bold = (props: { children: React.ReactNode }) => (
  <Text as="span" tw="text-accent-333">
    {props.children}
  </Text>
);
export const Link = (props: { children: string }) => (
  <Text
    as="span"
    tw="text-primary-shade-2 underline hover:text-primary blog-lg:no-underline"
  >
    <NextLink href={props.children}>{props.children}</NextLink>
  </Text>
);
export const Clause = (props: {
  title: string;
  content: string | React.ReactNode;
}) => (
  <div>
    <Heading secondary as="h2">
      {props.title}
    </Heading>
    <div>{props.content}</div>
  </div>
);
