import { post, saveToken, get, removeToken } from "./base-http.service";

export type SignInCredentialsDto = {
  username: string;
  password: string;
};

export async function signIn(signInCredentialsDto: SignInCredentialsDto) {
  const response = await post("auth/signin", signInCredentialsDto);
  saveToken(response.data?.accessToken);
  return;
}

export async function getUser() {
  const response = await get("auth/user");
  return response.data;
}

export function signOut() {
  removeToken();
}
