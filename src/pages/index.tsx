import type { NextPage, NextPageContext } from "next";
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
import { FloatingAddButton } from "../components/FloatingAddButton";
import { useState } from "react";
import { useRouter } from "next/router";

const getTabIndex = (tab: string | string[]): number => {
  switch (tab) {
    case "envelopes":
      return 1;
    case "transactions":
    default:
      return 0;
  }
};

type Props = {
  defaultTab: string | string[];
};

const Home: NextPage<Props> = ({ defaultTab }) => {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState<number>(getTabIndex(defaultTab));

  const { result } = useUser();

  const [isAddEnvelopeButtonShown, setIsAddEnvelopButtonShown] =
    useState(false);

  const onChangeTabs = (tabIndex: number) => {
    setTabIndex(tabIndex);
    if (tabIndex === 1) {
      setIsAddEnvelopButtonShown(true);
      return;
    }
    setIsAddEnvelopButtonShown(false);
  };

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
        <Tabs
          isFitted
          variant="enclosed"
          index={tabIndex}
          onChange={(index) => onChangeTabs(index)}
        >
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
              <FloatingAddButton
                isShown={isAddEnvelopeButtonShown}
                onClick={() => {
                  router.push("envelopes/new");
                }}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Layout>
    );
  }

  return (
    <Layout>
      <Center>
        <Box>Log in to see transactions</Box>
      </Center>
    </Layout>
  );
};

type ServerSideProps = {
  props: Props;
};

export async function getServerSideProps(
  context: NextPageContext
): Promise<ServerSideProps> {
  return {
    props: { defaultTab: context.query.defaultTab ?? "transactions" },
  };
}

export default Home;
