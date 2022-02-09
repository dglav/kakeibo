import { VStack } from "@chakra-ui/react";
import { useTransactions } from "hooks/transactions.hooks";
import TransactionCard from "components/TransactionCard";

export const TransactionList = (): React.ReactElement => {
  const { isLoading, error, data } = useTransactions();

  if (!isLoading && !data) return <p>Not fetching and no data...</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <VStack spacing={8}>
      {data?.map((transaction) =>
        !transaction ? null : (
          <TransactionCard key={transaction.id} transaction={transaction} />
        )
      )}
    </VStack>
  );
};
