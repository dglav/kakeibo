import axios from "axios";
import { baseUrl } from "../baseUrl";

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

export async function getTransactions(): Promise<Transaction[]> {
  // const response = await fetch(`${baseUrl}/transactions`);

  // if (!response.ok) {
  //   throw new Error("Failed to fetch!");
  // }

  // return response.json();

  const response = await axios.get(`${baseUrl}/transactions`).catch(() => {
    throw new Error("Failed to fetch!");
  });

  return response.data;
}
