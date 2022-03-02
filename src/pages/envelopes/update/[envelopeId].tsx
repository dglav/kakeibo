import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { Layout } from "components/layout";
import { withAuthentication } from "../../../containers/withAuthentication";
import { Center } from "@chakra-ui/react";
import { EnvelopeForm } from "../../../components/EnvelopeForm";
import { EnvelopeDto } from "../../../services/envelopes.service";
import {
  useGetEnvelope,
  useUpdateEnvelopeMutation,
} from "../../../hooks/envelopes.hooks";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const envelopeId = context.query.envelopeId as string;

  return {
    props: { envelopeId },
  };
};

const UpdateEnvelopePage: NextPage = ({
  envelopeId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: envelope } = useGetEnvelope(envelopeId);
  const mutation = useUpdateEnvelopeMutation();
  const router = useRouter();

  const onSubmit = (envelope: EnvelopeDto) => {
    mutation.mutate({
      id: envelopeId,
      ...envelope,
    });
  };

  useEffect(() => {
    if (mutation.isSuccess) router.push("/?defaultTab=envelopes");
  }, [router, mutation.isSuccess]);

  return (
    <Layout>
      <Center mt="4">
        {!!envelope && (
          <EnvelopeForm
            onSubmit={(envelope) => onSubmit(envelope)}
            isLoading={false}
            initialValues={envelope}
          />
        )}
      </Center>
    </Layout>
  );
};

export default withAuthentication(UpdateEnvelopePage);

// Note: envelopeId is not coming in properly to the page
