import { deleteRequest, get, patch, post } from "./base-http.service";
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

export type UpdateEnvelopeDto = EnvelopeDto & {
  id: string;
};

export async function getEnvelopes(): Promise<Envelope[]> {
  const response = await get("envelopes");
  return response.data;
}

export async function getEnvelope(id: string): Promise<Envelope> {
  const response = await get(`envelopes/${id}`);
  return response.data;
}

export async function getEnvelopeByName(name: string): Promise<Envelope> {
  const response = await get(`envelopes/${name}`);
  return response.data;
}

export async function addEnvelope(envelopeDto: EnvelopeDto): Promise<Envelope> {
  const response = await post("envelopes", envelopeDto);
  return response.data;
}

export async function updateEnvelope(
  updateEnvelopeDto: UpdateEnvelopeDto
): Promise<Envelope> {
  const { id, ...envelopeDto } = updateEnvelopeDto;
  const response = await patch(`envelopes/${id}`, envelopeDto);
  return response.data;
}

export async function deleteEnvelope(id: string): Promise<string> {
  const response = await deleteRequest(`envelopes/${id}`);
  return response.data;
}
