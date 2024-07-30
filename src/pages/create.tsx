import { FormEvent, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import QuizInfoForm from "../components/quiz-info-form";
import QuestionInput from "../components/question-input";
import styles from "../styles/create.module.css";
import Button from "../components/button";
import saveQuizQuestions from "../utils/save-quiz-questions";
import { useAppDispatch } from "../redux/hooks";
import { setAlertMessage } from "../redux/slices/alert-message.slice";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { QuizQuestion } from "../interfaces/quiz-question.interface";
import { serializeQuizQuestions } from "../utils/serialize-quiz-questions";

export type CreationStage = "initial" | "final";

export default function Create() {
  // In the "initial" stage, user will fill up title and start/end time for the quiz,
  // which will be sent to server and this state will be set to "final"
  const [creationStage, setCreationStage] = useState<CreationStage>("initial");

  // This array will be used to map question inputs in the page
  // Each question will be associated with a unique generated ID
  const [questionIds, setQuestionIds] = useState<string[]>([]);

  const [quizTitle, setQuizTitle] = useState("Title");

  const [loading, setLoading] = useState(false);

  const questionsForm = useRef<HTMLFormElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // On initial page load, generate and save a new ID in order to map one question input on the page
    saveNewId();
  }, []);

  const quizInfo = JSON.parse(String(localStorage.getItem("QUIZ_INFO")));

  useEffect(() => {
    if (quizInfo) setQuizTitle(quizInfo.title);
  }, [quizInfo]);

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
    localStorage.removeItem("QUIZ_INFO");
    setCreationStage("initial");
  }

  async function handleFormSubmit(e: FormEvent) {
    setLoading(true);

    e.preventDefault();

    const questionInputs = (
      questionsForm.current?.querySelector("#allQuestions") as Element
    ).children;

    const quizQuestions: QuizQuestion[] =
      serializeQuizQuestions(questionInputs);

    try {
      const res = await saveQuizQuestions(quizQuestions);
      dispatch(setAlertMessage({ message: res?.data, status: "success" }));
      localStorage.removeItem("QUIZ_INFO");
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
          <h1 className={styles.title}>{quizTitle}</h1>
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
