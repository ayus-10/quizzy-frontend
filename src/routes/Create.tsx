import { useState } from "react";
import QuestionForm from "../components/QuestionForm";
import styles from "../styles/Create.module.css";
import Button from "../components/Button";

function Create() {
  const [questionNumber, setQuestionNumber] = useState(1); // Used to add another QuestionForm

  function addQuestion() {
    setQuestionNumber((prev) => prev + 1);
  }

  return (
    <div className={styles.container}>
      <div className={styles.questions}>
        {Array.from({ length: questionNumber }).map((_, index) => (
          <QuestionForm key={index} questionNumber={index + 1} />
        ))}
        <div className={styles.separator}></div>
        <div className={styles.button_parent}>
          <Button text="Add question" action={addQuestion} />
          <Button text="Submit quiz" />
        </div>
      </div>
    </div>
  );
}

export default Create;
