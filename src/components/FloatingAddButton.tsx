import { AddIcon } from "@chakra-ui/icons";
import { Box, theme } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  isShown: boolean;
  onClick: () => void;
};

export const FloatingAddButton = ({ isShown, onClick }: Props) => {
  const [mounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return mounted && isShown
    ? createPortal(
        <Box
          bg={theme.colors.green[400]}
          as="button"
          onClick={onClick}
          height="60px"
          width="60px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="50%"
          position="absolute"
          right="48px"
          bottom="48px"
        >
          <AddIcon w="1.4em" h="1.4em" color="white" />
        </Box>,
        document.getElementById("document-root") as HTMLElement
      )
    : null;
};
