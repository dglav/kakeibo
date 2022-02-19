import { format } from "date-fns";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Transaction } from "services/transactions.service";
import { Card } from "./Card";
import { useRouter } from "next/router";

type Props = {
  transaction: Transaction;
};

const TransactionCard = ({ transaction }: Props): React.ReactElement => {
  const router = useRouter();

  return (
    <Card
      onClickEdit={() => {
        router.push(`/transactions/edit/${transaction.id}`);
      }}
    >
      <Box>
        <Heading pb={2}>{transaction.name}</Heading>
        <Text>Amount: {transaction.amount}</Text>
        <Text>
          Envelope: {transaction.envelope?.name ?? "Unknown Envelope"}
        </Text>
        <Text>Date: {format(new Date(transaction.date), "yyyy/MM/dd")}</Text>
      </Box>
    </Card>
  );
};

export default TransactionCard;
