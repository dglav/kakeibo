import type { FC } from "react";
import { Heading, Container } from "@chakra-ui/react";

const Layout: FC = ({ children }) => {
  return (
    <>
      <Heading p="4" bg="tomato" color="white">
        Money Manager
      </Heading>
      <Container maxW="container.sm">{children}</Container>
    </>
  );
};

export default Layout;
