import { QuizQuestion } from "../interfaces/quiz-question.interface";

// This function is used to get quiz data in appropriate format during quiz creation
export function serializeQuizQuestions(questionInputs: HTMLCollection) {
  const quizQuestions: QuizQuestion[] = [];
  Array.from(questionInputs).forEach((questionInput) => {
    const question = (
      questionInput.querySelector(".questionInput") as HTMLInputElement
    ).value;
    const answerChoices: string[] = [];
    const answerInputs = questionInput.querySelectorAll(".answerInputs");
    answerInputs.forEach((answerInput) => {
      answerChoices.push((answerInput as HTMLInputElement).value);
    });
    const correctChoice = parseInt(
      (questionInput.querySelector(".correctChoice") as HTMLInputElement).value
    );
    const quizQuestion = { question, answerChoices, correctChoice };
    quizQuestions.push(quizQuestion);
  });
  return quizQuestions;
}
