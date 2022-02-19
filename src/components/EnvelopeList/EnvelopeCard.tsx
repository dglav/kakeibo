import { Text } from "@chakra-ui/react";
import { Envelope } from "../../services/envelopes.service";
import { Card } from "../Card";

type Props = {
  envelope: Envelope;
};

export const EnvelopeCard = ({ envelope }: Props): React.ReactElement => {
  return (
    <Card>
      <Text>{envelope.name}</Text>
    </Card>
  );
};
