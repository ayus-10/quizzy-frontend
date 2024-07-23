import { QuizQuestion } from "./quiz-question.interface";

export interface FetchedQuizQuestion extends QuizQuestion {
  quizId: string;
}
