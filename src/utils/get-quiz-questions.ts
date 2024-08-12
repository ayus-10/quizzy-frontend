import axios from "axios";
import { BASE_API_URL } from "../config";
import handleQuizRequests from "./handle-quiz-requests";

export default async function getQuizQuestions(id: string) {
  const apiUrl = `${BASE_API_URL}/quiz/questions?id=${id}`;

  const getQuizQuestionsRequest = () => axios.get(apiUrl);

  return await handleQuizRequests(getQuizQuestionsRequest);
}
