import { useState } from "react";
import styles from "../styles/question-input.module.css";
import Button from "./button";
import { v4 as uuid } from "uuid";

type QuestionInputProps = {
  questionNumber: number;
};

export default function QuestionInput(props: QuestionInputProps) {
  const { questionNumber } = props;

  const [numberOfChoices, setNumberOfChoices] = useState(2);

  function incrementNumberOfChoices() {
    setNumberOfChoices((prev) => (prev < 6 ? prev + 1 : prev));
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.question_input_div} ${styles.input_div}`}>
        <label htmlFor="questionInput">Question {questionNumber}</label>
        <input type="text" id="questionInput" placeholder="Question here..." />
      </div>
      <div className={styles.answer_container}>
        {Array.from({ length: numberOfChoices }).map((_, index) => (
          <div
            key={uuid()}
            className={`${styles.answer_input_div} ${styles.input_div}`}
          >
            <input
              type="text"
              id="questionInput"
              placeholder="Answer choice here..."
            />
            <span className={styles.count}>{index + 1}</span>
          </div>
        ))}
      </div>
      <div className={styles.options}>
        <input
          type="number"
          min={1}
          max={numberOfChoices}
          placeholder="Correct answer"
          className={styles.correct_answer_input}
        />
        <Button title="add choice" action={incrementNumberOfChoices} />
      </div>
    </div>
  );
}
