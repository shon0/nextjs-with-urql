import React from "react";
import { dedupExchange, fetchExchange } from "@urql/core";
import { cacheExchange } from "@urql/exchange-graphcache";
import { withUrqlClient, SSRExchange } from "next-urql";

const mergeExchanges = (ssrExchange: SSRExchange) => [
  dedupExchange,
  cacheExchange({}),
  ssrExchange,
  fetchExchange
];

const Index = () => {
  return <></>;
};

export default withUrqlClient(
  { url: "https://graphql-pokemon.now.sh" },
  mergeExchanges
)(Index);
