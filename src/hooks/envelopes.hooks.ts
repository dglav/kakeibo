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
  UpdateEnvelopeDto,
  deleteEnvelope,
  Envelope,
  getEnvelopes,
  getEnvelope,
  updateEnvelope,
} from "../services/envelopes.service";

export const useGetEnvelopes = (): QueryObserverResult<Envelope[], any> => {
  return useQuery("envelopes", () => getEnvelopes());
};

export const useGetEnvelope = (
  id: string
): QueryObserverResult<Envelope, any> => {
  return useQuery(["envelope", { id }], () => getEnvelope(id));
};

export function useAddEnvelopeMutation(): UseMutationResult<
  Envelope,
  any,
  EnvelopeDto,
  void
> {
  return useMutation((addEnvelopeDto) => addEnvelope(addEnvelopeDto));
}

export function useUpdateEnvelopeMutation(): UseMutationResult<
  Envelope,
  any,
  UpdateEnvelopeDto,
  void
> {
  const queryClient = useQueryClient();
  return useMutation((updateEnvelopeDto) => updateEnvelope(updateEnvelopeDto), {
    onSuccess: (envelope) => {
      queryClient.setQueryData(["envelope", { id: envelope.id }], envelope);
    },
  });
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
