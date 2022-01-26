import { QueryObserverResult, useQuery } from "react-query";
import { getTransactions, Transaction } from "../services/transactions.service";

export function useTransactions(): QueryObserverResult<Transaction[], Error> {
  return useQuery("transactions", () => getTransactions());
}
