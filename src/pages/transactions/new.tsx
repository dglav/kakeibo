import { SubmitHandler } from "react-hook-form";
import type { NextPage } from "next";
import { TransactionDto } from "services/transactions.service";
import { useAddTransactionMutation } from "hooks/transactions.hooks";
import {
  TransactionForm,
  TransactionFormValues,
} from "../../components/TransactionForm";
import { Center } from "@chakra-ui/react";
import { Layout } from "../../components/layout";
import { useGetEnvelopes } from "../../hooks/envelopes.hooks";
import { withAuthentication } from "../../containers/withAuthentication";

const NewTransactionPage: NextPage = () => {
  const {
    isLoading: isLoadingEnvelopes,
    error: envelopesError,
    data: envelopes,
  } = useGetEnvelopes();
  const mutation = useAddTransactionMutation();
  const { isError, isLoading, isSuccess, mutate } = mutation;

  const onSubmit: SubmitHandler<TransactionFormValues> = (data) => {
    const transactionDto: TransactionDto = {
      name: data.name,
      type: "WITHDRAWL",
      amount: data.amount,
      currency: "JPY",
      envelopeName: data.envelopeName,
      date: data.date.toISOString(),
    };
    mutate(transactionDto);
  };

  return (
    <Layout>
      <Center mt="4">
        {envelopes && (
          <TransactionForm
            onSubmit={onSubmit}
            isError={isError}
            isLoading={isLoading}
            isSuccess={isSuccess}
            envelopes={envelopes}
          />
        )}
      </Center>
    </Layout>
  );
};

export default withAuthentication(NewTransactionPage);
