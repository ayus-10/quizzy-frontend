import axios, { AxiosResponse } from "axios";
import getRefreshedTokens from "./get-refreshed-tokens";

// This function is used to handle all of the API requests related with quiz creation
export default async function handleQuizRequests(
  sendRequest: () => Promise<AxiosResponse<any, any>>
) {
  try {
    return await sendRequest();
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 403) {
        // A 403 indicates that users' access token is expired
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
