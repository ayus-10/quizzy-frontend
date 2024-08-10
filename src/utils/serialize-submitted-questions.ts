interface AnswerSubmission {
  questionId: string;
  selectedAnswerNumber: number;
}

export default function serializeSubmittedQuestions(form: HTMLFormElement) {
  const answerInputs = Array.from(form.childNodes);
  const serializedData: AnswerSubmission[] = [];
  answerInputs.forEach((child) => {
    const inputs = (child as HTMLDivElement).getElementsByTagName("input");
    const inputsArray = Array.from(inputs);
    for (let index = 0; index < inputsArray.length; index++) {
      const questionId = inputsArray[index].getAttribute("name") as string;
      if (inputsArray[index].checked) {
        serializedData.push({ questionId, selectedAnswerNumber: index + 1 });
        break;
      }
      if (inputsArray.length === index + 1) {
        serializedData.push({ questionId, selectedAnswerNumber: 0 });
      }
    }
  });
  return serializedData;
}
