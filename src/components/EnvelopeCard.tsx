import { Box, Text } from "@chakra-ui/react";
import { Envelope } from "../services/envelopes.service";

type Props = {
  envelope: Envelope;
};

export const EnvelopeCard = ({ envelope }: Props): React.ReactElement => {
  return (
    <Box shadow="md" width="100%" padding={4}>
      <Text>Name: {envelope.name}</Text>
    </Box>
  );
};
