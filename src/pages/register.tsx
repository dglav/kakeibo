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
import { Layout } from "components/Layout";
import { useForm } from "react-hook-form";
import { useUser } from "hooks/useUser";

type FormData = {
  username: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();
  const { result, register: registerUser } = useUser();
  const router = useRouter();

  const onSubmit = (formData: FormData) => {
    if (formData.password !== formData.confirmPassword) {
      setError(
        "password",
        { type: "manual", message: "Passwords should match" },
        { shouldFocus: true }
      );
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords should match",
      });
      return;
    }
    registerUser(formData);
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
              {...register("username", { required: "Please enter a username" })}
            />
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor="password" id="password">
              Password
            </FormLabel>
            <Input
              id="password"
              type="password"
              isInvalid={!!errors.password}
              {...register("password", { required: "Please enter a password" })}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.confirmPassword}>
            <FormLabel htmlFor="password" id="password">
              Confirm Password
            </FormLabel>
            <Input
              id="confirmPassword"
              type="password"
              isInvalid={!!errors.confirmPassword}
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
            />
            <FormErrorMessage>
              {errors.confirmPassword?.message}
            </FormErrorMessage>
          </FormControl>

          <Button type="submit" bg={theme.colors.green[400]} color="white">
            Register
          </Button>
        </Stack>
      </form>
    </Layout>
  );
};

export default RegisterPage;
