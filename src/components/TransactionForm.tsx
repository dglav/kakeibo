import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
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
import { useRouter } from "next/router";
import { Envelope } from "../services/envelopes.service";

export type TransactionFormValues = {
  type: string;
  name: string;
  amount: number;
  currency: string;
  envelopeName: string;
  date: Date;
};

type Props = {
  onSubmit: (transactionDto: TransactionFormValues) => void;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  initialValues?: TransactionFormValues;
  envelopes: Envelope[];
};

export const TransactionForm = ({
  onSubmit,
  isSuccess,
  isError,
  isLoading,
  initialValues,
  envelopes,
}: Props): React.ReactElement => {
  const { register, control, setValue, handleSubmit } =
    useForm<TransactionFormValues>({ defaultValues: initialValues });
  const [date, setDate] = useState<MaterialUiPickersDate>(
    initialValues?.date || new Date()
  );
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    } else if (isError) {
      window.alert("failed writing data");
    }
  }, [isSuccess, isError, router]);

  useEffect(() => {
    register("date");
  }, [register]);

  useEffect(() => {
    if (date) {
      setValue("date", date, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [setValue, date]);

  return (
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
          isLoading={isLoading}
        >
          Submit
        </Button>
      </form>
    </Stack>
  );
};
