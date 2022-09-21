import { NextRouter, withRouter } from "next/router";
import Head from "next/head";
import { ArticleJsonLd } from "next-seo";

import { formatDate } from "@/components/Blog/Date";
import { AUTHOR } from "@/static/ts/constants";

const SEO = ({
  title,
  description,
  image,
  date,
  keywords,
  router,
  children,
}: {
  title: string;
  description?: string;
  image?: string;
  date?: string;
  keywords?: string;
  router: NextRouter;
  children: React.ReactNode;
}) => {
  const url = router && router.asPath ? router.asPath : undefined;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="robots" content="all" />
        {description && <meta content={description} name="description" />}
        {keywords && <meta content={keywords} name="keywords" />}
        <meta content="follow, index" name="robots" />
        {/* <--- Favicons ---> */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://osteocenter.vercel.app/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://osteocenter.vercel.app/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="194x194"
          href="https://osteocenter.vercel.app/favicons/favicon-194x194.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="https://osteocenter.vercel.app/favicons/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://osteocenter.vercel.app/favicons/favicon-16x16.png"
        />
        <link
          rel="manifest"
          href="https://osteocenter.vercel.app/favicons/site.webmanifest"
        />
        <link
          rel="mask-icon"
          href="https://osteocenter.vercel.app/favicons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link
          rel="shortcut icon"
          href="https://osteocenter.vercel.app/favicons/favicon.ico"
        />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta
          name="msapplication-config"
          content="https://osteocenter.vercel.app/favicons/browserconfig.xml"
        />
        <meta name="theme-color" content="#f1f9ff" />
        {/* <--- Open Graph ---> */}
        <meta content="es_PE" property="og:locale" />
        <meta content={title} property="og:title" />
        <meta content={description} property="og:description" />
        <meta content={url} property="og:url" />
        {image && (
          <>
            <meta content={image} property="og:image" />
            <meta content={description} property="og:image:alt" />
          </>
        )}
        {date && (
          <>
            <meta content="article" property="og:type" />
            <meta
              content={formatDate(date)}
              property="article:published_time"
            />
            <meta content="Medicine" property="article:section" />
          </>
        )}
        <meta content="summary_large_image" name="twitter:card" />
        <meta name="author" content={AUTHOR} />
      </Head>
      {children}
      {date && (
        <ArticleJsonLd
          authorName={AUTHOR}
          dateModified={formatDate(date)}
          datePublished={formatDate(date)}
          description={description || ""}
          images={[image as string]}
          publisherLogo="https://osteocenter.vercel.app/favicons/android-chrome-192x192.png"
          publisherName="Traumatología y ortopedia en Chimbote - Clínica Osteocenter"
          title={title}
          url={url || ""}
        />
      )}
    </>
  );
};

export default withRouter(SEO);
