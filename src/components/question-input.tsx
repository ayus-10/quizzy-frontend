import { useEffect, useState } from "react";
import styles from "../styles/question-input.module.css";
import Button from "./button";
import { v4 as uuid } from "uuid";
import { IoIosClose } from "react-icons/io";

type QuestionInputProps = {
  questionNumber: number;
  questionId: string;
  removeQuestion: (id: string) => void;
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

  const [choiceIds, setChoiceIds] = useState<string[]>([]);

  useEffect(() => {
    let i = 1;
    const maxChoiceCount = previousAnswerChoices?.length ?? 1;
    do {
      saveNewId();
      i++;
    } while (i < maxChoiceCount);
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
    <div className={styles.container}>
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
      <div className={styles.answer_container}>
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
