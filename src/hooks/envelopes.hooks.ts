import {
  QueryObserverResult,
  useMutation,
  UseMutationResult,
  useQuery,
} from "react-query";
import {
  addEnvelope,
  AddEnvelopeDto,
  deleteEnvelope,
  Envelope,
  getEnvelopes,
} from "../services/envelopes.service";

export const useGetEnvelopes = (): QueryObserverResult<Envelope[], any> => {
  return useQuery("envelopes", () => getEnvelopes());
};

export function useAddEnvelopeMutation(): UseMutationResult<
  Envelope,
  any,
  AddEnvelopeDto,
  void
> {
  return useMutation((addEnvelopeDto) => addEnvelope(addEnvelopeDto));
}

export function useDeleteEnvelopeMutation(): UseMutationResult<
  string,
  any,
  string,
  void
> {
  return useMutation((envelopeId) => deleteEnvelope(envelopeId));
}
