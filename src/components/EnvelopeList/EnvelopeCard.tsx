import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Envelope } from "../../services/envelopes.service";
import { Card } from "../Card";
import { useDeleteEnvelopeMutation } from "../../hooks/envelopes.hooks";
import { useEffect, useRef, useState } from "react";

type Props = {
  envelope: Envelope;
};

export const EnvelopeCard = ({ envelope }: Props): React.ReactElement => {
  const mutation = useDeleteEnvelopeMutation();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    mutation.reset();
    setIsOpen(false);
  };
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (mutation.isError) {
      setIsOpen(true);
    }
  }, [mutation.isError, mutation.error]);

  return (
    <>
      <Card
        onClickDelete={() => {
          mutation.mutate(envelope.id);
        }}
      >
        <Box>
          <Heading pb={2}>{envelope.name}</Heading>
          <Text>Amount: {envelope.amount}</Text>
        </Box>
      </Card>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Server Error
            </AlertDialogHeader>

            <AlertDialogBody whiteSpace="pre-line">
              {`Status Code: ${mutation.error?.response?.data?.statusCode}
              Message: ${mutation.error?.response?.data?.message}`}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Ok
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
