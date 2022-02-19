import { get, post, patch } from "./base-http.service";

type TransactionType = "DEPOSIT" | "WITHDRAWL";

type TransactionCurrency = "US" | "JPY";

export type Transaction = {
  id: string;
  name: string;
  type: TransactionType;
  amount: number;
  currency: TransactionCurrency;
  envelope?: {
    id: string;
    name: string;
  };
  date: string;
  createdAt: string;
  updatedAt: string;
};

export type TransactionDto = {
  name: string;
  type: TransactionType;
  amount: number;
  currency: TransactionCurrency;
  envelopeName: string;
  date: string;
};

export type EditTransactionDto = {
  id: string;
  name: string;
  type: TransactionType;
  amount: number;
  currency: TransactionCurrency;
  envelopeName: string;
  date: string;
};

export async function getTransactions(): Promise<Transaction[]> {
  const response = await get("transactions");
  return response.data;
}

export async function addTransaction(
  transactionDto: TransactionDto
): Promise<Transaction> {
  const response = await post("transactions", transactionDto);

  return response.data;
}

export async function getTransaction(id: string): Promise<Transaction> {
  const response = await get(`transactions/${id}`);
  return response.data;
}

export async function editTransaction(
  editTransactionDto: EditTransactionDto
): Promise<Transaction> {
  const { id, ...transactionDto } = editTransactionDto;
  const response = await patch(`transactions/${id}/edit`, transactionDto);

  return response.data;
}
