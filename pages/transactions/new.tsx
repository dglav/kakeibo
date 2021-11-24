import { useState } from "react";
import type { NextPage } from "next";
import Layout from "../../components/layout";
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
} from "@chakra-ui/react";
import { DatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

const format = (val: string) => val + "円";
const parse = (val: string) => val.replace(/^\$/, "");

const NewTransactionPage: NextPage = () => {
  const [value, setValue] = useState("1000");
  const [selectedDate, setDateChange] = useState<MaterialUiPickersDate>(
    new Date()
  );

  return (
    <Layout>
      <Center mt="4">
        <Stack w="100%">
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input type="name" isRequired />
            <FormHelperText>What was the transaction?</FormHelperText>
          </FormControl>
          <FormControl id="amount">
            <FormLabel>Amount</FormLabel>
            <NumberInput
              type="amount"
              defaultValue={1000}
              min={1}
              onChange={(valueString) => setValue(parse(valueString))}
              value={format(value)}
              isRequired
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormHelperText>How much was it?</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Envelope</FormLabel>
            <Select placeholder="Select option" isRequired>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            <FormHelperText>
              Which envelope would you like to pull from?
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <DatePicker
              value={selectedDate}
              onChange={(newDate) => setDateChange(newDate)}
            />
            <FormHelperText>
              What date was this transaction made?
            </FormHelperText>
          </FormControl>
        </Stack>
      </Center>
    </Layout>
  );
};

export default NewTransactionPage;
