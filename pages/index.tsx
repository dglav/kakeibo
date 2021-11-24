import type { NextPage } from "next";
import NextLink from "next/link";
import { Center, Link } from "@chakra-ui/react";
import { createClient, Provider } from "urql";
import Layout from "../components/layout";
import TransactionList from "../components/TransactionList";

const client = createClient({
  url: "http://localhost:4000/graphql",
});

const Home: NextPage = () => {
  return (
    <Provider value={client}>
      <Layout>
        <Center mt="4">
          <NextLink href="/transactions/new">
            <Link>Add New Purchase</Link>
          </NextLink>
        </Center>
        <TransactionList />
      </Layout>
    </Provider>
  );
};

export default Home;
