import axios from "axios";
import { Transaction, TransactionDto } from "../../types";

export async function addTransaction(
  transactionDto: TransactionDto
): Promise<Transaction> {
  const response = await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, transactionDto)
    .catch(() => {
      throw new Error("Failed to post!");
    });

  return response.data;
}
