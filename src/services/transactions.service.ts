import { get } from "./base-http.service";

type TransactionType = "DEPOSIT" | "WITHDRAWL";

type TransactionCurrency = "US" | "JPY";

export type Transaction = {
  id: string;
  name: string;
  type: TransactionType;
  amount: number;
  currency: TransactionCurrency;
  envelopeId: string;
  date: string;
  createdAt: string;
  updatedAt: string;
};

export type TransactionDto = Omit<
  Transaction,
  "id" | "createdAt" | "updatedAt"
>;

export async function getTransactions(): Promise<Transaction[]> {
  const response = await get("transactions");
  return response.data;
}
