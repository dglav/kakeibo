import { deleteRequest, get, post } from "./base-http.service";

export type Envelope = {
  id: string;
  name: string;
};

export type AddEnvelopeDto = {
  name: string;
};

export async function getEnvelopes(): Promise<Envelope[]> {
  const response = await get("envelopes");
  return response.data;
}

export async function addEnvelope(
  addEnvelopeDto: AddEnvelopeDto
): Promise<Envelope> {
  const response = await post("envelopes", addEnvelopeDto);
  return response.data;
}

export async function deleteEnvelope(id: string): Promise<string> {
  const response = await deleteRequest(`envelopes/${id}`);
  return response.data;
}
