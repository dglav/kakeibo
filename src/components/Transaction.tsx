import { format } from "date-fns";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Transaction } from "../api/queries/getTransactions";

type Props = {
  transaction: Transaction;
};

const Transaction = ({ transaction }: Props): React.ReactElement => {
  return (
    <Box key={transaction.id} shadow="md" width="100%" padding={4}>
      <Heading pb={2}>{transaction.name}</Heading>
      <Text>Amount: {transaction.amount}</Text>
      <Text>Date: {format(new Date(transaction.date), "yyyy/MM/dd")}</Text>
    </Box>
  );
};

export default Transaction;
