import { useSession, signIn, signOut } from "next-auth/react";
import NextLink from "next/link";
import { BaseLink } from "@/components/BaseStyle";
import tw, { styled } from "twin.macro";

const StyledNavLink = styled(BaseLink)(() => [
  tw`text-base font-medium`,
  tw`w-full py-5`,
  tw`lg:px-5 lg:w-auto`,
]);

export const LoginBttn = () => {
  const { data: session } = useSession();

  return (
    <NextLink passHref href="/platform/login">
      <StyledNavLink onClick={() => (session ? signOut() : signIn())}>
        {session ? "Salir" : "Entrar"}
      </StyledNavLink>
    </NextLink>
  );
};

export default function Login() {}
