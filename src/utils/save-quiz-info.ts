import axios from "axios";
import { BASE_API_URL } from "../config";
import handleQuizRequests from "./handle-quiz-requests";

interface QuizInfo {
  title: string;
  startTime: number;
  endTime: number;
}

export default async function saveQuizInfo(info: QuizInfo) {
  const apiUrl = `${BASE_API_URL}/quiz/info`;

  const saveQuizInfoRequest = async () => axios.post(apiUrl, info);

  try {
    return await handleQuizRequests(saveQuizInfoRequest);
  } catch (err) {
    throw err;
  }
}
