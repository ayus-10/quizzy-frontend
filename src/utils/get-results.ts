import axios from "axios";
import { BASE_API_URL } from "../config";
import handleQuizRequests from "./handle-quiz-requests";

export default async function getResults(id: string) {
  const apiUrl = `${BASE_API_URL}/quiz/result/${id}`;

  const getResultsRequest = () => axios.get(apiUrl);

  return await handleQuizRequests(getResultsRequest);
}
