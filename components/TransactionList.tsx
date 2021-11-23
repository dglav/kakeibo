import { VStack } from "@chakra-ui/react";
import { useQuery } from "urql";
import Transaction from "./Transaction";

export type Transaction = {
  id: number;
  type: string;
  name: string;
  amount: number;
  currency: string;
  envelopeId: number;
  date: number;
  createdAt: number;
  updatedAt: number;
};

const TransactionsQuery = `
  query {
    transactions {
      id
      name
      amount
      date
    }
  }
`;

const TransactionList = (): React.ReactElement => {
  const [result, reexecuteQuery] = useQuery({
    query: TransactionsQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <VStack spacing={8}>
      {data.transactions.map((transaction: Transaction) => (
        <Transaction key={transaction.id} transaction={transaction} />
      ))}
    </VStack>
  );
};

export default TransactionList;
