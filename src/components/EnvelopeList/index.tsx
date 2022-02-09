import { Center, VStack } from "@chakra-ui/react";
import { useGetEnvelopes } from "../../hooks/envelopes.hooks";
import { EnvelopeCard } from "./EnvelopeCard";

export const EnvelopeList = (): React.ReactElement => {
  const { isLoading, error, data } = useGetEnvelopes();

  if (!isLoading && !data) return <p>Not fetching and no data...</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <Center mt="4">
      <VStack spacing={8} w="100%">
        {data?.map((envelope) => (
          <EnvelopeCard key={envelope.id} envelope={envelope} />
        ))}
      </VStack>
    </Center>
  );
};
