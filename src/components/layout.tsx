import {
  Heading,
  Container,
  Text,
  Button,
  theme,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useUser } from "hooks/useUser";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props): React.ReactElement => {
  const { result, signOut } = useUser();
  const router = useRouter();

  return (
    <Grid
      height="100vh"
      templateColumns="1fr"
      templateRows="auto 1fr"
      gap={0}
      templateAreas={`"header" "main"`}
      id="page-root"
    >
      <GridItem gridArea="header">
        <Heading
          p="4"
          bg={theme.colors.green[400]}
          color="white"
          display="flex"
          justifyContent="space-between"
        >
          <Link href="/" passHref>
            <Text cursor="pointer">Money Manager</Text>
          </Link>
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
      </GridItem>
      <GridItem overflow="auto" gridArea="main">
        <Container maxW="container.sm" mt={4}>
          {children}
        </Container>
      </GridItem>
    </Grid>
  );
};
