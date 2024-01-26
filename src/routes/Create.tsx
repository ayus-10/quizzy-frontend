import { useState } from "react";
import QuestionForm from "../components/QuestionForm";
import styles from "../styles/Create.module.css";

function Create() {
  const [questionNumber, setQuestionNumber] = useState(1);

  return (
    <div className={styles.container}>
      <div className={styles.questions}>
        {Array.from({ length: questionNumber }).map((_, index) => (
          <QuestionForm
            key={index}
            questionNumber={index + 1}
            setQuestionNumber={setQuestionNumber}
          />
        ))}
      </div>
    </div>
  );
}

export default Create;
