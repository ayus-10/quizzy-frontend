import axios, { AxiosResponse } from "axios";
import getRefreshedTokens from "./get-refreshed-tokens";

export default async function handleQuizInfo(
  sendRequest: () => Promise<AxiosResponse<any, any>>
) {
  try {
    return await sendRequest();
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 403) {
        await getRefreshedTokens();
        try {
          return await sendRequest();
        } catch (err) {
          if (axios.isAxiosError(err)) {
            throw err;
          }
        }
      } else if (err.response?.status === 400) {
        throw err;
      }
    }
  }
}
