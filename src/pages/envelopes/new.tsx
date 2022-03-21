import type { NextPage } from "next";
import { Layout } from "components/Layout";
import { withAuthentication } from "../../containers/withAuthentication";
import { Center } from "@chakra-ui/react";
import { EnvelopeForm } from "../../components/EnvelopeForm";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { useAddEnvelopeMutation } from "../../hooks/envelopes.hooks";
import { EnvelopeDto } from "../../services/envelopes.service";

const AddEnvelopePage: NextPage = () => {
  const router = useRouter();
  const mutation = useAddEnvelopeMutation();

  const onSubmit: SubmitHandler<EnvelopeDto> = (data) => {
    const addEnvelopeDto: EnvelopeDto = {
      name: data.name,
      description: data.description,
      amount: data.amount,
      currency: data.currency,
    };
    mutation.mutate(addEnvelopeDto);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      router.push("/?defaultTab=envelopes");
    } else if (mutation.isError) {
      window.alert("failed writing data");
      mutation.reset();
    }
  }, [mutation, router]);

  return (
    <Layout>
      <Center mt="4">
        <EnvelopeForm
          onSubmit={(envelope) => onSubmit(envelope)}
          isLoading={mutation.isLoading}
        />
      </Center>
    </Layout>
  );
};

export default withAuthentication(AddEnvelopePage);
