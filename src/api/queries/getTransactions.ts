import axios from "axios";
import { Transaction } from "../../types";
import { baseUrl } from "../baseUrl";

export async function getTransactions(): Promise<Transaction[]> {
  const response = await axios.get(`${baseUrl}/transactions`).catch(() => {
    throw new Error("Failed to fetch!");
  });

  return response.data;
}
