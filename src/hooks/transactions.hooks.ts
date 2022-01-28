import {
  QueryObserverResult,
  useMutation,
  UseMutationResult,
  useQuery,
} from "react-query";
import {
  addTransaction,
  getTransactions,
  Transaction,
  TransactionDto,
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
