import { format } from "date-fns";
import { Box, Heading, HStack, IconButton, Text } from "@chakra-ui/react";
import { Transaction } from "services/transactions.service";
import { EditIcon } from "@chakra-ui/icons";
import Link from "next/link";

type Props = {
  transaction: Transaction;
};

const TransactionCard = ({ transaction }: Props): React.ReactElement => {
  return (
    <Box shadow="md" width="100%" padding={4}>
      <HStack justifyContent="space-between">
        <Box>
          <Heading pb={2}>{transaction.name}</Heading>
          <Text>Amount: {transaction.amount}</Text>
          <Text>
            Envelope: {transaction.envelope?.name ?? "Unknown Envelope"}
          </Text>
          <Text>Date: {format(new Date(transaction.date), "yyyy/MM/dd")}</Text>
        </Box>
        <Link href={`/transactions/edit/${transaction.id}`} passHref={true}>
          <IconButton aria-label="Search database" icon={<EditIcon />} />
        </Link>
      </HStack>
    </Box>
  );
};

export default TransactionCard;
