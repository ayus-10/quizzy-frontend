import { FormEvent, useEffect, useRef, useState } from "react";
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

  const questionsForm = useRef<HTMLFormElement>(null);

  useEffect(() => {
    saveNewId();

    getQuizInfo().then((res) => setQuizTitle(String(res?.data.quizInfo.title)));
  }, []);

  function saveNewId() {
    const newId = uuid();
    setQuestionIds((prev) => [...prev, newId]);
  }

  function cancelQuizCreation() {
    localStorage.removeItem("QUIZ_TOKEN");
    setCreationStage("initial");
  }

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();

    const questionInputs = (
      questionsForm.current?.querySelector("#allQuestions") as Element
    ).children;

    Array.from(questionInputs).forEach((questionInput) => {
      const question = (
        questionInput.querySelector(".questionInput") as HTMLInputElement
      ).value;
      const answerChoices: string[] = [];
      const answerInputs = questionInput.querySelectorAll(".answerInputs");
      answerInputs.forEach((answerInput) => {
        answerChoices.push((answerInput as HTMLInputElement).value);
      });
      const correctChoice = (
        questionInput.querySelector(".correctChoice") as HTMLInputElement
      ).value;
      const questionItem = { question, answerChoices, correctChoice };
      console.log(questionItem);
    });
  }

  switch (creationStage) {
    case "initial":
      return <QuizInfoForm setStage={setCreationStage} />;
    case "final":
      return (
        <form
          className={styles.container}
          onSubmit={handleFormSubmit}
          ref={questionsForm}
        >
          <h1 className={styles.title}>TITLE: {quizTitle || "loading..."}</h1>
          <div className={styles.questions} id="allQuestions">
            {questionIds.map((id, index) => (
              <QuestionInput key={id} questionNumber={index + 1} />
            ))}
          </div>
          <div className={styles.options}>
            <Button title="Add question" action={saveNewId} />
            <div className={styles.options}>
              <Button
                title="Cancel"
                action={cancelQuizCreation}
                secondaryColor
              />
              <Button title="Submit" submitForm />
            </div>
          </div>
        </form>
      );
  }
}
