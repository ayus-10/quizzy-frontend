import axios from "axios";
import { BASE_API_URL } from "../config";
import getRefreshedTokens from "./get-refreshed-tokens";

interface QuizInfo {
  title: string;
  startTime: number;
  endTime: number;
}

export default async function saveQuizInfo(info: QuizInfo) {
  const apiUrl = BASE_API_URL + "/quiz/info";

  const sendRequest = async () => axios.post(apiUrl, info);

  try {
    const { data } = await sendRequest();
    return data;
  } catch (err) {
    if (!axios.isAxiosError(err)) {
      return;
    }
    if (err.response?.status === 403) {
      await getRefreshedTokens();
      try {
        const { data } = await sendRequest();
        return data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          return err.response?.data;
        }
      }
    } else if (err.response?.status === 400) {
      return err.response?.data;
    }
  }
}
