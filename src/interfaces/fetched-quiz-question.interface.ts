import { QuizQuestion } from "./quiz-question.interface";

export interface FetchedQuizQuestion extends QuizQuestion {
  questionId: string;
  quizId: string;
}
