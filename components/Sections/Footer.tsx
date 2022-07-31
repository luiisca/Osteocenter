import tw, { styled, css } from "twin.macro";
import NextLink from "next/link";
import Image from "next/image";
import { BsWhatsapp, BsFacebook } from "react-icons/bs";

import useIsMobile from "@/components/hooks/useIsMobile";

import { BaseContainer, BaseLink } from "@/components/BaseStyle";
import { IconWrap } from "pages/blog/[slug]";
import { FACEBOOK_PAGE, getWhatsappLink } from "@/static/ts/constants";

const LogoWrapper = tw.a`block relative w-full max-w-[250px]`;
const Title = tw.p`text-lg mb-10 font-medium`;
const FlexList = tw.ul`flex flex-col gap-6`;
const Link = styled(BaseLink)(() => [
  tw`text-base`,
  css`
    &:link,
    &:visited {
      ${tw`text-[#767676]`}
    }
    &:hover,
    &:active {
      ${tw`text-accent-555`}
    }
  `,
]);
const Column = styled.nav(() => [
  tw`mb-8`,
  css`
    grid-row: 1;
    grid-column: span 3;
    @media (min-width: 600px) {
      grid-column: span 1;
      grid-row: unset;
    }
  `,
]);
const LogoColumn = styled.div(() => [
  tw`flex flex-col justify-start w-full gap-8`,
  css`
    grid-column: span 2;
    @media (min-width: 545px) {
      grid-column: span 3;
    }
    @media (min-width: 600px) {
      grid-column: span 1;
    }
  `,
]);
const ContactColumn = styled.div(() => [
  css`
    grid-column: span 4;
    @media (min-width: 545px) {
      grid-column: span 3;
    }
    @media (min-width: 600px) {
      grid-column: span 1;
    }
  `,
]);

const Container = styled(BaseContainer)(() => [
  tw`py-24 grid grid-cols-6 gap-12 mob-me:gap-y-16`,
  css`
    @media (min-width: 600px) {
      ${tw`grid-cols-[1.5fr 1.5fr 1fr 1fr]`}
    }
  `,
]);
const Footer = () => {
  const isMobile = useIsMobile();

  return (
    <Container>
      <LogoColumn>
        <NextLink href="/">
          <LogoWrapper>
            <Image
              layout="responsive"
              height="88"
              width="412"
              alt="osteocenter logo"
              src="/img/osteocenter-logo.png"
            />
          </LogoWrapper>
        </NextLink>
        <ul tw="flex gap-6">
          <li>
            <NextLink href={FACEBOOK_PAGE}>
              <IconWrap tw="cursor-pointer">
                <BsFacebook />
              </IconWrap>
            </NextLink>
          </li>
          <li>
            <a
              href={getWhatsappLink(isMobile)}
              target="_blank"
              rel="noreferrer"
            >
              <IconWrap tw="cursor-pointer">
                <BsWhatsapp />
              </IconWrap>
            </a>
          </li>
        </ul>
      </LogoColumn>

      <ContactColumn>
        <Title>Contacto</Title>
        <address tw="text-base leading-[1.6] not-italic ">
          <p tw="mb-6">
            Clínica SantaMaría, Elías Aguirre #761- interior 1er piso, 2do
            Pabellón 02711 Chimbote, Perú
          </p>
          <p>
            <Link href="tel:+51992569407">992-569-407</Link>
            <Link href="tel:+51969780055">969-780-055</Link>
            <Link href="mailto:osteocenter.admi@gmail.com">
              osteocenter.admi@gmail.com
            </Link>
          </p>
        </address>
      </ContactColumn>

      <Column>
        <Title>Cuenta</Title>
        <FlexList>
          <li>
            <Link href="#">Crear cuenta</Link>
          </li>
          <li>
            <Link href="#">Entrar</Link>
          </li>
        </FlexList>
      </Column>

      <Column>
        <Title>Clinica</Title>
        <FlexList>
          <li>
            <Link href="#">Sobre Osteocenter</Link>
          </li>
          <li>
            <NextLink href="/blog" passHref>
              <Link>Blog</Link>
            </NextLink>
          </li>
        </FlexList>
      </Column>
    </Container>
  );
};

export default Footer;
