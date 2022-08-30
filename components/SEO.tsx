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
        {description && <meta content={description} name="description" />}
        {keywords && <meta content={keywords} name="keywords" />}
        <meta content="follow, index" name="robots" />
        {/* <--- Favicons ---> */}
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#f1f9ff" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <meta
          name="msapplication-config"
          content="/favicons/browserconfig.xml"
        />
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
          publisherName="Clinica ortopédica en chimbote - Osteocenter"
          title={title}
          url={url || ""}
        />
      )}
    </>
  );
};

export default withRouter(SEO);
