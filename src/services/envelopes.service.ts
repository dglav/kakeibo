import { deleteRequest, get, post } from "./base-http.service";
import { TransactionCurrency } from "./commonTypes";

export type Envelope = {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
};

export type EnvelopeDto = {
  name: string;
  description: string;
  amount: number;
  currency: TransactionCurrency;
};

export async function getEnvelopes(): Promise<Envelope[]> {
  const response = await get("envelopes");
  return response.data;
}

export async function addEnvelope(envelopeDto: EnvelopeDto): Promise<Envelope> {
  const response = await post("envelopes", envelopeDto);
  return response.data;
}

export async function deleteEnvelope(id: string): Promise<string> {
  const response = await deleteRequest(`envelopes/${id}`);
  return response.data;
}
