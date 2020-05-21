import React from "react";
import { dedupExchange, fetchExchange } from "@urql/core";
import { cacheExchange } from "@urql/exchange-graphcache";
import { devtoolsExchange } from "@urql/devtools";
import { withUrqlClient, SSRExchange } from "next-urql";
import { useQuery } from "urql";
import gql from "graphql-tag";
import "isomorphic-unfetch";

const mergeExchanges = (ssrExchange: SSRExchange) => [
  dedupExchange,
  devtoolsExchange,
  cacheExchange({}),
  ssrExchange,
  fetchExchange,
];

const queryPokemon = gql`
  query pokemon($first: Int!) {
    pokemons(first: $first) {
      id
      name
      types
      image
    }
  }
`;

type Data = {
  pokemons: {
    id: string;
    name: string;
    types: string[];
    image: string;
  }[];
};

const Index = () => {
  const [result] = useQuery<Data>({
    query: queryPokemon,
    variables: { first: 9 },
  });

  if (result.fetching) return <div>loading...</div>;
  if (result.error) return <div>error...</div>;

  return (
    <div>
      Hello!!
      {process.env.NEXT_PUBLIC_TEST || "I don't have env"}
      {result.data.pokemons.map((p) => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <div>{p.types.join(" / ")}</div>
          <img src={p.image} />
        </div>
      ))}
    </div>
  );
};

export default withUrqlClient(
  { url: "https://graphql-pokemon.now.sh" },
  mergeExchanges
)(Index);
