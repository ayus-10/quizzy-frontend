import axios from "axios";
import { BASE_API_URL } from "../config";
import { QuizQuestion } from "../interfaces/quiz-question.interface";
import handleQuizRequests from "./handle-quiz-requests";

export default async function updateQuizQuestions(
  id: string,
  quizQuestions: QuizQuestion[]
) {
  const apiUrl = `${BASE_API_URL}/quiz/questions/${id}`;

  const updateQuizQuestionsRequest = () =>
    axios.patch(apiUrl, { quizQuestions });

  try {
    return await handleQuizRequests(updateQuizQuestionsRequest);
  } catch (err) {
    throw err;
  }
}
