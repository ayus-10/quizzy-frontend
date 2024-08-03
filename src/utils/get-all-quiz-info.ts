import axios from "axios";
import { BASE_API_URL } from "../config";
import handleQuizRequests from "./handle-quiz-requests";
import { FetchedQuizInfo } from "../interfaces/fetched-quiz-info.interface";

interface AllQuizInfo {
  infos: FetchedQuizInfo;
}

export default async function getAllQuizInfo() {
  const apiUrl = `${BASE_API_URL}/quiz/info`;

  const getAllQuizInfoRequest = () => axios.get<AllQuizInfo>(apiUrl);

  return await handleQuizRequests(getAllQuizInfoRequest);
}
