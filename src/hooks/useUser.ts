import { useQuery, useQueryClient, UseQueryResult } from "react-query";
import {
  getUser,
  register,
  signIn,
  CredentialsDto,
  signOut,
} from "../services/auth.service";

export function useUser(): {
  register: (credentialsDto: CredentialsDto) => Promise<void>;
  signIn: (credentialsDto: CredentialsDto) => Promise<void>;
  signOut: () => void;
  result: UseQueryResult<any, unknown>;
} {
  const queryClient = useQueryClient();
  const result = useQuery("user", getUser, { retry: 1 });

  const handleRegister = async (credentialsDto: CredentialsDto) => {
    register(credentialsDto);
  };

  const handleSignOut = async () => {
    signOut();
    await queryClient.resetQueries();
  };

  const handleSignIn = async (credentialsDto: CredentialsDto) => {
    await signIn(credentialsDto);
    await result.refetch();
  };

  return {
    result,
    register: handleRegister,
    signIn: handleSignIn,
    signOut: handleSignOut,
  };
}
