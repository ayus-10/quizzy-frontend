import axios from "axios";
import { BASE_API_URL } from "../config";
import handleQuizRequests from "./handle-quiz-requests";

interface FetchedQuizInfo {
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

  const getQuizInfoRequest = () =>
    axios.post<FetchedQuizInfo>(apiUrl, { token: quizToken });

  try {
    return await handleQuizRequests(getQuizInfoRequest);
  } catch (err) {
    throw err;
  }
}
