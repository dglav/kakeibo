import { QueryObserverResult, useQuery } from "react-query";
import { Envelope, getEnvelopes } from "../services/envelopes.service";

export const useGetEnvelopes = (): QueryObserverResult<Envelope[], Error> => {
  return useQuery("envelopes", () => getEnvelopes());
};
