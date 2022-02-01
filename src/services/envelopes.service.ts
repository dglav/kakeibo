import { get } from "./base-http.service";

export type Envelope = {
  id: string;
  name: string;
};

export async function getEnvelopes(): Promise<Envelope[]> {
  const response = await get("envelopes");
  return response.data;
}
