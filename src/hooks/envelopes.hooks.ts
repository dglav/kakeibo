import {
  QueryObserverResult,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "react-query";
import {
  addEnvelope,
  EnvelopeDto,
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
  EnvelopeDto,
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
  const queryClient = useQueryClient();

  return useMutation((envelopeId) => deleteEnvelope(envelopeId), {
    onSuccess: () => {
      queryClient.refetchQueries("envelopes");
    },
  });
}
