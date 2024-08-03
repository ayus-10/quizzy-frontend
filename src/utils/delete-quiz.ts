import axios from "axios";
import { BASE_API_URL } from "../config";
import handleQuizRequests from "./handle-quiz-requests";

export default async function deleteQuiz(id: string) {
  const apiUrl = `${BASE_API_URL}/quiz/${id}`;

  const deleteQuizRequest = () => axios.delete(apiUrl);

  return await handleQuizRequests(deleteQuizRequest);
}
