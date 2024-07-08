import axios from "axios";
import { BASE_API_URL } from "../config";
import { QuizQuestion } from "../pages/admin/create";
import handleQuizRequests from "./handle-quiz-requests";

export default async function saveQuizQuestions(quizQuestions: QuizQuestion[]) {
  const apiUrl = BASE_API_URL + "/quiz/save-questions";

  const quizToken = localStorage.getItem("QUIZ_TOKEN");

  const saveQuizQuestionsRequest = () =>
    axios.post(apiUrl, { quizToken, quizQuestions });

  try {
    return await handleQuizRequests(saveQuizQuestionsRequest);
  } catch (err) {
    throw err;
  }
}
