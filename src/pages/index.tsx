import type { NextPage } from "next";
import NextLink from "next/link";
import {
  Box,
  Center,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Layout } from "components/layout";
import { TransactionList } from "components/TransactionList";
import { EnvelopeList } from "components/EnvelopeList";
import { useUser } from "hooks/useUser";

const Home: NextPage = () => {
  const { result } = useUser();

  if (result.isLoading) {
    return (
      <Layout>
        <Box>Loading...</Box>
      </Layout>
    );
  }

  if (result.isSuccess) {
    return (
      <Layout>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Purchases</Tab>
            <Tab>Envelopes</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Center>
                <NextLink href="/transactions/new">
                  <Link>Add New Purchase</Link>
                </NextLink>
              </Center>
              <TransactionList />
            </TabPanel>
            <TabPanel>
              <EnvelopeList />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box>Log in to see transactions</Box>
    </Layout>
  );
};

export default Home;
