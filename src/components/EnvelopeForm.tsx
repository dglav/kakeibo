import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Envelope, EnvelopeDto } from "../services/envelopes.service";

type Props = {
  onSubmit: (envelope: EnvelopeDto) => void;
  isLoading: boolean;
  initialValues?: Envelope;
};

export const EnvelopeForm = ({ onSubmit, isLoading, initialValues }: Props) => {
  console.log({ initialValues });
  const { register, handleSubmit } = useForm({ defaultValues: initialValues });

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
          <Input
            type="number"
            isRequired
            {...register("amount", { required: true })}
          />
        </FormControl>

        <FormControl id="currency">
          <FormLabel>Currency</FormLabel>
          <Select isRequired {...register("currency", { required: true })}>
            <option value="JPY">yen</option>
          </Select>
        </FormControl>

        <FormControl id="description">
          <FormLabel>Description</FormLabel>
          <Textarea defaultValue="" {...register("description")} />
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
