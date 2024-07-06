import axios from "axios";
import { BASE_API_URL } from "../config";
import getRefreshedTokens from "./get-refreshed-tokens";

interface QuizInfo {
  quizInfo: {
    id: string;
    password: string;
    startTime: number;
    endTime: number;
    title: string;
    createdBy: string;
  };
}

export default async function getQuizInfo() {
  const apiUrl = BASE_API_URL + "/quiz/get-info";

  const quizToken = localStorage.getItem("QUIZ_TOKEN");

  if (!quizToken) {
    return;
  }

  const sendRequest = () => axios.post<QuizInfo>(apiUrl, { token: quizToken });

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
