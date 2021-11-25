import type { NextPage } from "next";
import NextLink from "next/link";
import { Center, Link } from "@chakra-ui/react";
import Layout from "../components/layout";
import TransactionList from "../components/TransactionList";

const Home: NextPage = () => {
  return (
    <Layout>
      <Center mt="4">
        <NextLink href="/transactions/new">
          <Link>Add New Purchase</Link>
        </NextLink>
      </Center>
      <TransactionList />
    </Layout>
  );
};

export default Home;
