import { GetStaticProps } from "next";
import type { NextPage } from "next";
import tw, { styled } from "twin.macro";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { CorporateContactJsonLd, LocalBusinessJsonLd } from "next-seo";

import SEO from "@/components/SEO";
import { SITE_TITLE, WEB_LINK, PHONE1, PHONE2 } from "@/static/ts/constants";
import { featuredPostsQuery } from "@/utils/sanity/queries";

import Hero from "@/components/Hero";
import Services from "@/components/Services"
import Values from "@/components/Values";
import Biography from "@/components/Biography";
import Steps from "@/components/Steps";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";

const DynamicArticles = dynamic(() => import("@/components/Articles"), {
  suspense: true,
});
const DynamicLocation = dynamic(() => import("@/components/Location"), {
  suspense: true,
});

interface SectionProps {
  hero?: boolean;
  valuesSection?: boolean;
  biography?: boolean;
  cta?: boolean;
}

export const Section = styled.section((props: SectionProps) => [
  tw`py-24`,
  props.hero && tw`pt-12 bg-primary-tint-3`,
  props.valuesSection && tw`text-center`,
  props.biography && tw`p-0 mx-8 md:mx-16`,
  props.cta && tw`p-0`,
]);

const Home: NextPage = (): JSX.Element => {
  return (
    <>
      <SEO
        description={
          "Empresa dedicada a la prevención, atención y recuperación de patologías que afectan al sistema músculo esquelético. Contamos con especialistas altamente capacitados. Separa citas, recibe tratamiento, prescripciones y haz consultas a tu médico todo desde nuestra plataforma en linea."
        }
        image={`${WEB_LINK}/img/osteocenter-logo.png`}
        title="Traumatología y ortopedia en Chimbote - Reserva tu cita en
          linea"
        keywords={
          "Medico tramatologo en Chimbote, Medico Ortopedico en Chimbote, Medicina, Traumatologia en Chimbote, Ortopedia, Cita medica online, Telemedicina, Chimbote, Peru, Artroscopia, Consulta medica presencial, atencion a domicilio, terapia con ondas de choque, cirugia, tratamiento de secuelas y deformidades, ortopedia infantil, lesiones deportivas"
        }
      >
        <main>
          <Section hero>
            <Hero />
          </Section>
          <Section>
            <Services />
          </Section>
          <Section valuesSection id="valores">
            <Values />
          </Section>
          <Section biography>
            <Biography />
          </Section>
          <Section>
            <Steps />
          </Section>
          <Section tw="py-[7rem] bg-primary-tint-3">
            <Testimonials />
          </Section>
          <Section>
            <Suspense fallback={`Cargando mapa...`}>
              <DynamicLocation />
            </Suspense>
          </Section>
          <Section cta>
            <CallToAction />
          </Section>
          <Section>
            <Suspense fallback={`Cargando articulos...`}>
              <DynamicArticles />
            </Suspense>
          </Section>
        </main>
      </SEO>
      <CorporateContactJsonLd
        url={WEB_LINK}
        contactPoint={[
          {
            telephone: PHONE1,
            contactType: "customer service",
            areaServed: "PE",
            availableLanguage: "Spanish",
          },
          {
            telephone: PHONE2,
            contactType: "customer service",
            areaServed: "PE",
            availableLanguage: "Spanish",
          },
        ]}
      />
      <LocalBusinessJsonLd
        type="Medical Clinic"
        id={WEB_LINK}
        url={WEB_LINK}
        name={SITE_TITLE}
        description="Empresa dedicada a la prevención, atención y recuperación de patologías que afectan al sistema músculo esquelético. Contamos con especialistas altamente capacitados. Separa citas, recibe tratamiento, prescripciones y haz consultas a tu médico todo desde nuestra plataforma en linea."
        telephone={PHONE1}
        address={{
          streetAddress: "",
          addresLocality: "Nuevo Chimbote",
          adressRegion: "Ancash",
          postalCode: "02711",
          adressCountry: "PE",
        }}
        geo={{
          latitude: -9.07072482316217,
          longitude: -78.59092492175259,
        }}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps<any> = async () => {
  const { QueryClient, dehydrate } = await import("react-query");
  const { sanityClient } = await import("@/utils/sanity/sanity.server");

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["featuredPosts"], () =>
    sanityClient.fetch(featuredPostsQuery)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
