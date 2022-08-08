import { useSession, signIn, signOut } from "next-auth/react";
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
    <StyledNavLink onClick={() => (session ? signOut() : signIn())}>
      {session ? "Salir" : "Entrar"}
    </StyledNavLink>
  );
};

export default function Login() {}
