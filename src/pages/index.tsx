import type { NextPage } from "next";
import NextLink from "next/link";
import { Box, Center, Link } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import TransactionList from "../components/TransactionList";
import { useUser } from "../hooks/useUser";

const Home: NextPage = () => {
  const { result } = useUser();

  return (
    <Layout>
      <Center>
        <NextLink href="/transactions/new">
          <Link>Add New Purchase</Link>
        </NextLink>
      </Center>
      {result.isSuccess ? <TransactionList /> : <Box>Not logged in</Box>}
    </Layout>
  );
};

export default Home;
