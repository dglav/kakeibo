import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import type { NextPage } from "next";
import {
  Center,
  Stack,
  FormControl,
  FormLabel,
  FormHelperText,
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

type TransactionForm = {
  type: string;
  name: string;
  amount: number;
  currency: string;
  envelopeId: string;
  date: Date;
};

const NewTransactionPage: NextPage = () => {
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
      envelopeId: data.envelopeId,
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
              <FormHelperText>What was the transaction?</FormHelperText>
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
              <FormHelperText>How much was it?</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Envelope</FormLabel>
              <Select
                placeholder="Select option"
                isRequired
                {...register("envelopeId", { required: true })}
              >
                <option value={1}>Option 1</option>
                <option value={2}>Option 2</option>
                <option value={3}>Option 3</option>
              </Select>
              <FormHelperText>
                Which envelope would you like to pull from?
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <DatePicker
                value={date}
                onChange={(newDate) => {
                  setDate(newDate);
                }}
              />
              <FormHelperText>
                What date was this transaction made?
              </FormHelperText>
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

export default NewTransactionPage;
