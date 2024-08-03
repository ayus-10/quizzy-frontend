export interface QuizSubmission {
  quizId: string;
  submittedBy: string;
  submittedQuestions: SubmittedQuestion[];
}

export interface SubmittedQuestion {
  questionId: string;
  selectedAnswerNumber: number;
  correctAnswerNumber: number;
}
