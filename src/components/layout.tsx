import { Heading, Container, Text, Button, theme } from "@chakra-ui/react";
import { useUser } from "../hooks/useUser";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props): React.ReactElement => {
  const { result, signOut } = useUser();
  const router = useRouter();

  return (
    <>
      <Heading
        p="4"
        bg={theme.colors.green[400]}
        color="white"
        display="flex"
        justifyContent="space-between"
      >
        <Text>Money Manager</Text>
        {result.isSuccess ? (
          <Button
            bg={theme.colors.green[600]}
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            bg={theme.colors.green[600]}
            onClick={() => {
              router.push("/signin");
            }}
          >
            Sign In
          </Button>
        )}
      </Heading>
      <Container maxW="container.sm" mt={4}>
        {children}
      </Container>
    </>
  );
};
