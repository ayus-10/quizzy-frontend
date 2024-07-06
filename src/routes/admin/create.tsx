import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import QuizInfoForm from "../../components/quiz-info-form";
import QuestionInput from "../../components/question-input";
import styles from "../../styles/create.module.css";
import Button from "../../components/button";
import getQuizInfo from "../../utils/get-quiz-info";

export type CreationStage = "initial" | "final";

export default function Create() {
  const [creationStage, setCreationStage] = useState<CreationStage>("initial");

  const [questionIds, setQuestionIds] = useState<string[]>([]);

  const [quizTitle, setQuizTitle] = useState("");

  useEffect(() => {
    saveNewId();

    getQuizInfo().then((res) => setQuizTitle(String(res?.data.quizInfo.title)));
  }, []);

  function saveNewId() {
    const newId = uuid();
    setQuestionIds((prev) => [...prev, newId]);
  }

  switch (creationStage) {
    case "initial":
      return <QuizInfoForm setStage={setCreationStage} />;
    case "final":
      return (
        <div className={styles.container}>
          <h1 className={styles.title}>TITLE: {quizTitle}</h1>
          <div className={styles.questions}>
            {questionIds.map((id, index) => (
              <QuestionInput key={id} questionNumber={index + 1} />
            ))}
          </div>
          <div className={styles.options}>
            <Button title="Add question" action={saveNewId} />
            <Button title="Done" />
          </div>
        </div>
      );
  }
}
