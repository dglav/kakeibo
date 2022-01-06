import axios from "axios";
import { Transaction, TransactionDto } from "../../types";
import { baseUrl } from "../baseUrl";

export async function addTransaction(
  transactionDto: TransactionDto
): Promise<Transaction> {
  const response = await axios
    .post(`${baseUrl}/transactions`, transactionDto)
    .catch(() => {
      throw new Error("Failed to post!");
    });

  return response.data;
}
