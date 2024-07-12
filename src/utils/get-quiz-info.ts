import axios from "axios";
import { BASE_API_URL } from "../config";
import handleQuizRequests from "./handle-quiz-requests";
import { FetchedQuizInfo } from "../interfaces/fetched-quiz-info.interface";

export default async function getQuizInfo() {
  const quizToken = localStorage.getItem("QUIZ_TOKEN");

  if (!quizToken) return;

  const apiUrl = `${BASE_API_URL}/quiz/info/${quizToken}`;

  const getQuizInfoRequest = () => axios.get<FetchedQuizInfo>(apiUrl);

  try {
    return await handleQuizRequests(getQuizInfoRequest);
  } catch (err) {
    throw err;
  }
}
