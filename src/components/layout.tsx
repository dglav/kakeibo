import {
  Heading,
  Container,
  Text,
  Button,
  theme,
  Grid,
  GridItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
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

          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              background="none"
              variant="outline"
              _active={{ background: theme.colors.green[600] }}
              _hover={{ background: theme.colors.green[600] }}
            />
            <MenuList>
              {result.isSuccess ? (
                <MenuItem
                  color="black"
                  _focus={{ background: theme.colors.green[300] }}
                  _hover={{ background: theme.colors.green[300] }}
                  onClick={() => {
                    signOut();
                  }}
                >
                  Sign Out
                </MenuItem>
              ) : (
                <MenuItem
                  color="black"
                  _focus={{ background: theme.colors.green[300] }}
                  _hover={{ background: theme.colors.green[300] }}
                  onClick={() => {
                    router.push("/signin");
                  }}
                >
                  Sign In
                </MenuItem>
              )}
            </MenuList>
          </Menu>
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
