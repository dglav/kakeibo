import { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  theme,
} from "@chakra-ui/react";
import { Layout } from "components/layout";
import { useForm } from "react-hook-form";
import { useUser } from "hooks/useUser";

type FormData = {
  username: string;
  password: string;
};

const SignInPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { result, signIn } = useUser();
  const router = useRouter();

  const onSubmit = (formData: FormData) => {
    signIn(formData);
  };

  useEffect(() => {
    if (result.isSuccess) {
      router.back();
    }
  }, [router, result.isSuccess]);

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl isInvalid={!!errors.username}>
            <FormLabel htmlFor="username" id="username">
              Username
            </FormLabel>
            <Input
              id="username"
              type="text"
              isInvalid={!!errors.username}
              {...register("username", { required: true })}
            />
            <FormErrorMessage>Username is required.</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor="password" id="password">
              Password
            </FormLabel>
            <Input
              id="password"
              type="password"
              isInvalid={!!errors.password}
              {...register("password", { required: true })}
            />
            <FormErrorMessage>Password is required.</FormErrorMessage>
          </FormControl>
          <Button type="submit" bg={theme.colors.green[400]} color="white">
            Sign In
          </Button>
        </Stack>
      </form>
    </Layout>
  );
};

export default SignInPage;
