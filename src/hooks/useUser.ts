import { useQuery, useQueryClient, UseQueryResult } from "react-query";
import {
  getUser,
  signIn,
  SignInCredentialsDto,
  signOut,
} from "../services/auth.service";

export function useUser(): {
  signIn: (signInCredentialsDto: SignInCredentialsDto) => Promise<void>;
  signOut: () => void;
  result: UseQueryResult<any, unknown>;
} {
  const queryClient = useQueryClient();
  const result = useQuery("user", getUser, { enabled: false });

  const handleSignOut = async () => {
    signOut();
    await queryClient.resetQueries();
  };

  const handleSignIn = async (signInCredentialsDto: SignInCredentialsDto) => {
    await signIn(signInCredentialsDto);
    await result.refetch();
  };

  return { result, signIn: handleSignIn, signOut: handleSignOut };
}
