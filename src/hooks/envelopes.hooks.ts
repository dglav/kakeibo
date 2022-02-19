import {
  QueryObserverResult,
  useMutation,
  UseMutationResult,
  useQuery,
} from "react-query";
import {
  addEnvelope,
  AddEnvelopeDto,
  Envelope,
  getEnvelopes,
} from "../services/envelopes.service";

export const useGetEnvelopes = (): QueryObserverResult<Envelope[], Error> => {
  return useQuery("envelopes", () => getEnvelopes());
};

export function useAddEnvelopeMutation(): UseMutationResult<
  Envelope,
  Error,
  AddEnvelopeDto,
  void
> {
  return useMutation((addEnvelopeDto) => addEnvelope(addEnvelopeDto));
}
