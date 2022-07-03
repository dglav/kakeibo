import { post, saveToken, get, removeToken } from "./base-http.service";

export type CredentialsDto = {
  username: string;
  password: string;
};

export async function register(credentialsDto: CredentialsDto) {
  const response = await post("auth/register", credentialsDto);
  saveToken(response.data?.accessToken);
  return;
}

export async function signIn(credentialsDto: CredentialsDto) {
  const response = await post("auth/signin", credentialsDto);
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
