import { useState } from "react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient, Hydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import customTheme from "theme";

import Layout from "../components/Layout";
import GlobalStyles from "../components/GlobalStyles";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  // where cache and request defaults can be stored and accesed from
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={customTheme}>
          <SessionProvider session={session}>
            <Layout preview={pageProps.preview}>
              <GlobalStyles />
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </ChakraProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
