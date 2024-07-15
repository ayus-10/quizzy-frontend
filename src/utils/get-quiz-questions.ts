import axios from "axios";
import { BASE_API_URL } from "../config";
import { QuizQuestion } from "../interfaces/quiz-question.interface";

type FetchedQuizQuestions = {
  quiz: QuizQuestion[];
};

export default async function getQuizQuestions(id: string, password: string) {
  const apiUrl = `${BASE_API_URL}/quiz/questions`;

  try {
    const res = await axios.post<FetchedQuizQuestions>(apiUrl, {
      id,
      password,
    });
    return res.data.quiz;
  } catch (err) {
    throw err;
  }
}
