import { Box, ButtonGroup, HStack, IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

type Props = {
  children: React.ReactElement;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
};

export const Card = ({
  children,
  onClickEdit,
  onClickDelete,
}: Props): React.ReactElement => {
  return (
    <Box shadow="md" width="100%" padding={4}>
      <HStack justifyContent="space-between">
        {children}
        <ButtonGroup>
          {!!onClickEdit && (
            <IconButton
              aria-label="edit"
              icon={<EditIcon />}
              onClick={onClickEdit}
            />
          )}
          {!!onClickDelete && (
            <IconButton
              aria-label="delete"
              icon={<DeleteIcon />}
              onClick={onClickDelete}
            />
          )}
        </ButtonGroup>
      </HStack>
    </Box>
  );
};
