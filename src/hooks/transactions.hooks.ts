import {
  QueryObserverResult,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "react-query";
import {
  addTransaction,
  getTransactions,
  Transaction,
  TransactionDto,
  getTransaction,
  editTransaction,
  EditTransactionDto,
} from "../services/transactions.service";

export function useTransactions(): QueryObserverResult<Transaction[], Error> {
  return useQuery("transactions", () => getTransactions());
}

export function useAddTransactionMutation(): UseMutationResult<
  Transaction,
  Error,
  TransactionDto,
  void
> {
  return useMutation((transactionDto) => addTransaction(transactionDto));
}

export function useGetTransaction(
  id: string
): QueryObserverResult<Transaction, Error> {
  return useQuery(["transaction", { id }], () => getTransaction(id));
}

export function useEditTransactionMutation(): UseMutationResult<
  Transaction,
  Error,
  EditTransactionDto,
  void
> {
  const queryClient = useQueryClient();

  const mutation = useMutation<Transaction, Error, EditTransactionDto, void>(
    (editTransactionDto: EditTransactionDto) =>
      editTransaction(editTransactionDto),
    {
      onSuccess: (transaction) => {
        queryClient.setQueryData(
          ["transaction", { id: transaction.id }],
          transaction
        );
      },
    }
  );

  return mutation;
}
