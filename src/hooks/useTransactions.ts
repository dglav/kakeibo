import { QueryObserverResult, useQuery } from "react-query";
import { getTransactions, Transaction } from "../api/queries/getTransactions";

export function useTransactions(): QueryObserverResult<Transaction[], Error> {
  return useQuery("transactions", () => getTransactions());
}
