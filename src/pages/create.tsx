import { FormEvent, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import QuizInfoForm from "../components/quiz-info-form";
import QuestionInput from "../components/question-input";
import styles from "../styles/create.module.css";
import Button from "../components/button";
import getQuizInfo from "../utils/get-quiz-info";
import saveQuizQuestions from "../utils/save-quiz-questions";
import { useAppDispatch } from "../redux/hooks";
import { setAlertMessage } from "../redux/slices/alert-message.slice";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { QuizQuestion } from "../interfaces/quiz-question.interface";

export type CreationStage = "initial" | "final";

export default function Create() {
  const [creationStage, setCreationStage] = useState<CreationStage>("initial");

  const [questionIds, setQuestionIds] = useState<string[]>([]);

  const [quizTitle, setQuizTitle] = useState("");

  const [loading, setLoading] = useState(false);

  const questionsForm = useRef<HTMLFormElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    saveNewId();

    async function fetchQuizTitle() {
      const res = await getQuizInfo();
      setQuizTitle(res?.data.title);
    }

    fetchQuizTitle();
  }, []);

  function saveNewId() {
    const newId = uuid();
    setQuestionIds((prev) => [...prev, newId]);
  }

  function removeQuestion(idToBeRemoved: string) {
    if (questionIds.length <= 2) {
      return;
    }
    setQuestionIds((prev) => prev.filter((id) => id !== idToBeRemoved));
  }

  function cancelQuizCreation() {
    localStorage.removeItem("QUIZ_TOKEN");
    setCreationStage("initial");
  }

  async function handleFormSubmit(e: FormEvent) {
    setLoading(true);

    e.preventDefault();

    const questionInputs = (
      questionsForm.current?.querySelector("#allQuestions") as Element
    ).children;

    const quizQuestions: QuizQuestion[] = [];

    Array.from(questionInputs).forEach((questionInput) => {
      const question = (
        questionInput.querySelector(".questionInput") as HTMLInputElement
      ).value;
      const answerChoices: string[] = [];
      const answerInputs = questionInput.querySelectorAll(".answerInputs");
      answerInputs.forEach((answerInput) => {
        answerChoices.push((answerInput as HTMLInputElement).value);
      });
      const correctChoice = parseInt(
        (questionInput.querySelector(".correctChoice") as HTMLInputElement)
          .value
      );
      const quizQuestion = { question, answerChoices, correctChoice };
      quizQuestions.push(quizQuestion);
    });

    try {
      const res = await saveQuizQuestions(quizQuestions);
      dispatch(setAlertMessage({ message: res?.data, status: "success" }));
      localStorage.removeItem("QUIZ_TOKEN");
      setCreationStage("initial");
    } catch (err) {
      if (axios.isAxiosError(err))
        dispatch(
          setAlertMessage({
            message: err.response?.data,
            status: "error",
          })
        );
    } finally {
      setLoading(false);
    }
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
          <h1 className={styles.title}>{quizTitle || "loading..."}</h1>
          <div className={styles.questions} id="allQuestions">
            {questionIds.map((id, index) => (
              <QuestionInput
                key={id}
                questionNumber={index + 1}
                questionId={id}
                removeQuestion={removeQuestion}
              />
            ))}
          </div>
          <div className={`${styles.options} ${styles.options_div}`}>
            <Button title="Add question" action={saveNewId} />
            <div className={styles.options}>
              <Button
                title="Cancel"
                action={cancelQuizCreation}
                secondaryColor
              />
              <Button title="Submit" submitForm>
                {loading ? <BeatLoader color="#fff" /> : undefined}
              </Button>
            </div>
          </div>
        </form>
      );
  }
}
