import { useMutation, UseMutationResult } from "react-query";
import { Transaction, TransactionDto } from "../types";
import { addTransaction } from "../api/mutations/addTransaction";

export function useAddTransactionMutation(): UseMutationResult<
  Transaction,
  Error,
  TransactionDto,
  void
> {
  return useMutation((transactionDto) => addTransaction(transactionDto));
}
