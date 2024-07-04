import { useState } from "react";
import { v4 as uuid } from "uuid";
import QuizInfoForm from "../../components/quiz-info-form";
import QuestionInput from "../../components/question-input";
import styles from "../../styles/create.module.css";
import Button from "../../components/button";

export type CreationStage = "initial" | "final";

export default function Create() {
  const [creationStage, setCreationStage] = useState<CreationStage>("initial");

  const [numberOfQuestions, setNumberOfQuestions] = useState(1);

  switch (creationStage) {
    case "initial":
      return <QuizInfoForm setStage={setCreationStage} />;
    case "final":
      return (
        <div className={styles.container}>
          <div className={styles.questions}>
            {Array.from({ length: numberOfQuestions }).map((_, index) => (
              <QuestionInput key={uuid()} questionNumber={index + 1} />
            ))}
          </div>
          <div className={styles.options}>
            <Button
              title="Add question"
              action={() => setNumberOfQuestions((prev) => prev + 1)}
            />
            <Button title="Done" />
          </div>
        </div>
      );
  }
}
