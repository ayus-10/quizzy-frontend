import axios from "axios";
import { BASE_API_URL } from "../config";
import getRefreshedTokens from "./get-refreshed-tokens";

interface AuthenticatedUser {
  email: string;
}

export default async function getAuthenticatedUser() {
  const apiUrl = BASE_API_URL + "/auth/user";

  const sendRequest = async () => axios.get<AuthenticatedUser>(apiUrl);

  try {
    const { data } = await sendRequest();
    return data.email;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 403) {
      await getRefreshedTokens();
      const { data } = await sendRequest();
      return data.email;
    }
  }
}
