export type QuestionItemType = {
  id: number | null;
  questionText: string;
  answers: {
    answerText: string;
    isCorrect: boolean | null;
  }[];
};

export type ResponseDataType = {
  id: string;
  password: string;
  created: string;
};

export type QuizCredentialsType = {
  id: string;
  password: string;
};

export type AnswerSubmissionsType = {
  id: number | null;
  isCorrect: boolean | null;
};
