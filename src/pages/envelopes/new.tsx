import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import type { NextPage } from "next";
import {
  Center,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { AddEnvelopeDto } from "services/envelopes.service";
import { Layout } from "components/layout";
import { useAddEnvelopeMutation } from "hooks/envelopes.hooks";
import { useRouter } from "next/router";
import { withAuthentication } from "../../containers/withAuthentication";

type EnvelopeForm = {
  name: string;
};

const AddEnvelopePage: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const mutation = useAddEnvelopeMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<EnvelopeForm> = (data) => {
    const addEnvelopeDto: AddEnvelopeDto = {
      name: data.name,
    };
    mutation.mutate(addEnvelopeDto);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      router.push("/?defaultTab=envelopes");
    } else if (mutation.isError) {
      window.alert("failed writing data");
    }
  }, [mutation, router]);

  return (
    <Layout>
      <Center mt="4">
        <Stack w="100%">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                type="name"
                isRequired
                {...register("name", { required: true })}
              />
            </FormControl>
            <Button
              mt={4}
              bgColor="tomato"
              textColor="white"
              type="submit"
              isLoading={mutation.isLoading}
            >
              Submit
            </Button>
          </form>
        </Stack>
      </Center>
    </Layout>
  );
};

export default withAuthentication(AddEnvelopePage);
