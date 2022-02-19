import { SubmitHandler } from "react-hook-form";
import type { NextPage } from "next";
import { Transaction, TransactionDto } from "services/transactions.service";
import { useGetTransaction } from "hooks/transactions.hooks";
import { useEditTransactionMutation } from "hooks/transactions.hooks";
import { withAuthentication } from "../../../containers/withAuthentication";
import {
  TransactionForm,
  TransactionFormValues,
} from "../../../components/TransactionForm";
import { useRouter } from "next/router";
import { Center } from "@chakra-ui/react";
import { Layout } from "../../../components/layout";
import { useGetEnvelopes } from "../../../hooks/envelopes.hooks";

const convertToFormValues = (
  transaction: Transaction | undefined
): TransactionFormValues | undefined => {
  if (!transaction) return;

  const { name, amount, currency, date, envelope, type } = transaction;

  return {
    name,
    amount,
    currency,
    date: new Date(date),
    envelopeName: envelope?.name || "",
    type,
  };
};

const EditTransactionPage: NextPage = () => {
  const router = useRouter();
  const { transactionId } = router.query;

  const { data: envelopes } = useGetEnvelopes();
  const { data: transaction } = useGetTransaction(transactionId as string);
  const initialTransactionValues = convertToFormValues(transaction);

  const mutation = useEditTransactionMutation();
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
    mutate({ id: transactionId as string, ...transactionDto });
  };

  const canRenderForm = !!initialTransactionValues && !!envelopes;

  return (
    <Layout>
      <Center mt="4">
        {canRenderForm && (
          <TransactionForm
            initialValues={initialTransactionValues}
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

export default withAuthentication(EditTransactionPage);
