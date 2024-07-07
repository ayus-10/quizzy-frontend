import axios from "axios";
import { BASE_API_URL } from "../config";
import handleQuizInfo from "./handle-quiz-info";

interface QuizInfo {
  title: string;
  startTime: number;
  endTime: number;
}

export default async function saveQuizInfo(info: QuizInfo) {
  const apiUrl = BASE_API_URL + "/quiz/save-info";

  const saveQuizInfoRequest = async () => axios.post(apiUrl, info);

  try {
    return await handleQuizInfo(saveQuizInfoRequest);
  } catch (err) {
    throw err;
  }
}
