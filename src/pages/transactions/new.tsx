import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import type { NextPage } from "next";
import {
  Center,
  Stack,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Button,
} from "@chakra-ui/react";
import { DatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { TransactionDto } from "services/transactions.service";
import { Layout } from "components/layout";
import { useAddTransactionMutation } from "hooks/transactions.hooks";
import { useRouter } from "next/router";
import { withAuthentication } from "../../containers/withAuthentication";
import { useGetEnvelopes } from "../../hooks/envelopes.hooks";

type TransactionForm = {
  type: string;
  name: string;
  amount: number;
  currency: string;
  envelopeName: string;
  date: Date;
};

const NewTransactionPage: NextPage = () => {
  const {
    isLoading: isLoadingEnvelopes,
    error: envelopesError,
    data: envelopes,
  } = useGetEnvelopes();
  const { register, control, setValue, handleSubmit } = useForm();
  const mutation = useAddTransactionMutation();
  const [date, setDate] = useState<MaterialUiPickersDate>(new Date());
  const router = useRouter();

  const onSubmit: SubmitHandler<TransactionForm> = (data) => {
    const transactionDto: TransactionDto = {
      name: data.name,
      type: "WITHDRAWL",
      amount: data.amount,
      currency: "JPY",
      envelopeName: data.envelopeName,
      date: data.date.toISOString(),
    };
    mutation.mutate(transactionDto);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      router.push("/");
    } else if (mutation.isError) {
      window.alert("failed writing data");
    }
  }, [mutation, router]);

  useEffect(() => {
    register("date");
  }, [register]);

  useEffect(() => {
    setValue("date", date, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [setValue, date]);

  const canRenderForm = !isLoadingEnvelopes && !envelopesError;

  return (
    <Layout>
      <Center mt="4">
        <Stack w="100%">
          {canRenderForm && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input
                  type="name"
                  isRequired
                  {...register("name", { required: true })}
                />
              </FormControl>
              <FormControl id="amount">
                <FormLabel>Amount</FormLabel>
                <Controller
                  name="amount"
                  control={control}
                  defaultValue={1000}
                  rules={{ required: true, min: 1 }}
                  render={({ field }) => (
                    <NumberInput {...field} type="amount" min={1} isRequired>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  )}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Envelope</FormLabel>
                <Select
                  placeholder="Select option"
                  isRequired
                  {...register("envelopeName", { required: true })}
                >
                  {envelopes?.map((envelope) => (
                    <option key={envelope.id} value={envelope.name}>
                      {envelope.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Date</FormLabel>
                <DatePicker
                  value={date}
                  onChange={(newDate) => {
                    setDate(newDate);
                  }}
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
          )}
        </Stack>
      </Center>
    </Layout>
  );
};

export default withAuthentication(NewTransactionPage);
