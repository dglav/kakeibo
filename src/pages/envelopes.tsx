import type { NextPage } from "next";
import { Center, VStack } from "@chakra-ui/react";
import { Layout } from "components/layout";
import { withAuthentication } from "../containers/withAuthentication";
import { useGetEnvelopes } from "../hooks/envelopes.hooks";
import { EnvelopeCard } from "../components/EnvelopeCard";

const EnvelopeListPage: NextPage = () => {
  const { isLoading, error, data } = useGetEnvelopes();

  if (!isLoading && !data) return <p>Not fetching and no data...</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <Layout>
      <Center mt="4">
        <VStack spacing={8} w="100%">
          {data?.map((envelope) => (
            <EnvelopeCard key={envelope.id} envelope={envelope} />
          ))}
        </VStack>
      </Center>
    </Layout>
  );
};

export default withAuthentication(EnvelopeListPage);
