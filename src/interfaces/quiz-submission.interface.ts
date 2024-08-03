export interface QuizSubmission {
  quizId: string;
  submittedBy: string;
  submittedQuestions: {
    questionId: string;
    selectedAnswerNumber: number;
    correctAnswerNumber: number;
  }[];
}
