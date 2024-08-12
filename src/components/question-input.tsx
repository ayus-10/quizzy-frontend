import { useEffect, useState } from "react";
import styles from "../styles/question-input.module.css";
import Button from "./button";
import { v4 as uuid } from "uuid";
import { IoIosClose } from "react-icons/io";

type QuestionInputProps = {
  questionNumber: number;
  questionId: string;
  removeQuestion: (id: string) => void;

  // These optional props will only be provided by the "edit.tsx" component
  previousQuestion?: string;
  previousAnswerChoices?: string[];
  previousCorrectChoice?: number;
};

export default function QuestionInput(props: QuestionInputProps) {
  const {
    questionNumber,
    questionId,
    removeQuestion,
    previousQuestion,
    previousAnswerChoices,
    previousCorrectChoice,
  } = props;

  // This array will be used to render answer choice inputs in the component
  // Each answer choice will be associated with a unique generated ID
  const [choiceIds, setChoiceIds] = useState<string[]>([]);

  useEffect(() => {
    // On initial page load, either one or multiple choice ID will be generated and then saved,
    // so that appropriate number of answer choices will be rendered in the component
    let i = 1;

    // In case of editing previously submitted quiz questions, answer choice inputs equal to
    // previous count will be rendered
    // If new quiz questions are being created, only one choice input will be rendered
    const maxChoiceCount = previousAnswerChoices?.length ?? 1;
    do {
      saveNewId();
      i++;
    } while (i <= maxChoiceCount);
  }, []);

  function saveNewId() {
    const newId = uuid();
    if (choiceIds.length >= 8) {
      return;
    }
    setChoiceIds((prev) => [...prev, newId]);
  }

  function removeChoice(idToBeRemoved: string) {
    if (choiceIds.length <= 2) {
      return;
    }
    setChoiceIds((prev) => prev.filter((id) => id !== idToBeRemoved));
  }

  return (
    <div className={styles.question_input}>
      <div className={`${styles.question_input_div} ${styles.input_div}`}>
        <span>Question {questionNumber}</span>
        <input
          type="text"
          id={`questionInput${questionNumber}`}
          className="questionInput"
          placeholder="Question here..."
          defaultValue={previousQuestion}
        />
        <div className={styles.question_remove_button}>
          <Button title="remove" action={() => removeQuestion(questionId)}>
            <IoIosClose />
          </Button>
        </div>
      </div>
      <div className={styles.answers}>
        {choiceIds.map((id, index) => (
          <div
            key={id}
            className={`${styles.answer_input_div} ${styles.input_div}`}
          >
            <input
              type="text"
              id={`answerInput${questionNumber}_${index + 1}`}
              className="answerInputs"
              placeholder="Answer choice here..."
              defaultValue={
                previousAnswerChoices && previousAnswerChoices[index]
              }
            />
            <span className={styles.count}>{index + 1}</span>
            <div className={styles.choice_remove_button}>
              <Button title="remove" action={() => removeChoice(id)}>
                <IoIosClose />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.options}>
        <div className={styles.correct_answer_input_div}>
          <input
            type="number"
            min={1}
            max={choiceIds.length}
            id={`correctChoice${questionNumber}`}
            className="correctChoice"
            placeholder="Correct choice..."
            defaultValue={previousCorrectChoice}
          />
        </div>
        <Button title="add choice" action={saveNewId} />
      </div>
    </div>
  );
}
