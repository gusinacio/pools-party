import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";
import Head from "next/head";
import { useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  createHttpLink,
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const authPayload = localStorage.getItem("authPayload");
  if (authPayload) {
    const payload = JSON.parse(authPayload);
    const token = payload.token;
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  }
  // return the headers to the context so httpLink can read them
  return {
    headers: headers,
  };
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        questions: {
          merge(existing, incoming, { args }) {
            if (!args) {
              return undefined;
            }
            const { paginationInput: { offset} } = args;
            const merged = existing && existing.results ? existing.results.slice(0) : [];
            for (let i = 0; i < incoming.results.length; ++i) {
              merged[offset + i] = incoming.results[i];
            }
            return {
              total: incoming.total,
              results: merged,
            };
          },
          // ...offsetLimitPagination(),
          read(existing, { args }) {
            if (!args) return undefined;
            if (!existing)  return undefined;
            const { paginationInput: { offset, limit} } = args;
            const results = existing.results.slice(offset, offset + limit)
            if (results.length === 0) return undefined;
            return {
              total: existing.total,
              results,
            }
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache,
});

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap")
      : null;
  }, []);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}

export default MyApp;
