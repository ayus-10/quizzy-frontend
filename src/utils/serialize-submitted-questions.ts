interface AnswerSubmission {
  questionId: string;
  selectedAnswerNumber: number;
}

export default function serializeSubmittedQuestions(form: HTMLFormElement) {
  const answerInputs = Array.from(form.childNodes);
  const serializedData: AnswerSubmission[] = [];
  answerInputs.forEach((child) => {
    const inputs = (child as HTMLDivElement).getElementsByTagName("input");
    Array.from(inputs).forEach((input, index) => {
      if (input.checked) {
        const questionId = input.getAttribute("name") as string;
        const selectedAnswerNumber = index + 1;
        serializedData.push({ questionId, selectedAnswerNumber });
      }
    });
  });
  return serializedData;
}
