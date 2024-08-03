import axios from "axios";
import { BASE_API_URL } from "../config";
import { QuizQuestion } from "../interfaces/quiz-question.interface";

type FetchedQuizQuestions = {
  quiz: QuizQuestion[];
};

export default async function getQuizQuestions(id: string, password: string) {
  const apiUrl = `${BASE_API_URL}/quiz/questions?id=${id}&password=${password}`;

  const res = await axios.get<FetchedQuizQuestions>(apiUrl);
  return res.data.quiz;
}
