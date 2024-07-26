import { FetchedQuizQuestion } from "./fetched-quiz-question.interface";

export interface JoinedQuizQuestions {
  endTime: number;
  questions: FetchedQuizQuestion[];
}
