import axios from "axios";
import { BASE_API_URL } from "../config";
import { QuizQuestion } from "../interfaces/quiz-question.interface";
import handleQuizRequests from "./handle-quiz-requests";

export default async function saveQuizQuestions(quizQuestions: QuizQuestion[]) {
  const quizInfo = JSON.parse(String(localStorage.getItem("QUIZ_INFO")));

  const quizToken = quizInfo ? quizInfo.quizToken : null;

  const apiUrl = `${BASE_API_URL}/quiz/questions`;

  const saveQuizQuestionsRequest = () =>
    axios.post(apiUrl, { quizToken, quizQuestions });

  return await handleQuizRequests(saveQuizQuestionsRequest);
}
