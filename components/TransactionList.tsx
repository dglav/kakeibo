import { VStack } from "@chakra-ui/react";
import { Transaction as TransactionType } from "../pages";
import Transaction from "./Transaction";

type Props = {
  transactions: TransactionType[];
};

const TransactionList = ({ transactions }: Props): React.ReactElement => {
  return (
    <VStack spacing={8}>
      {transactions.map((transaction) => (
        <Transaction key={transaction.id} transaction={transaction} />
      ))}
    </VStack>
  );
};

export default TransactionList;
