import type { NextPage } from "next";
import NextLink from "next/link";
import { Center, Link } from "@chakra-ui/react";
import Layout from "../components/layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <Center mt="4">
        <NextLink href="/new-purchase">
          <Link>Add New Purchase</Link>
        </NextLink>
      </Center>
    </Layout>
  );
};

export default Home;
