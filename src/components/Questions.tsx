import { useEffect, useRef, useState } from "react";
import styles from "../styles/Questions.module.css";
import QuestionBox from "./QuestionBox";
import axios from "axios";
import { API_URL } from "../config/api";
import Button from "./Button.tsx";
import type { QuizCredentialsType } from "../index.d.ts";
import type { QuestionItemType } from "../index.d.ts";
import type { AnswerSubmissionsType } from "../index.d.ts";

function Questions() {
  const API = API_URL + "quiz/questions";

  const [questions, setQuestions] = useState<QuestionItemType[]>();

  const [index, setIndex] = useState(0);

  const emptyAnswerSubmission: AnswerSubmissionsType = {
    id: null,
    chosenAnswer: null,
    isCorrect: null,
  };

  const [answerSubmission, setAnswerSubmission] =
    useState<AnswerSubmissionsType>(emptyAnswerSubmission);

  const answerSubmissionsRef = useRef<AnswerSubmissionsType[]>([
    emptyAnswerSubmission,
  ]);

  const answerSubmissions = answerSubmissionsRef.current;

  useEffect(() => {
    let newData: AnswerSubmissionsType = {
      id: answerSubmission.id,
      chosenAnswer: answerSubmission.chosenAnswer,
      isCorrect: answerSubmission.isCorrect,
    };

    let submissionUpdated = false;

    for (let index = 0; index < answerSubmissions.length; index++) {
      if (answerSubmissions[index].id === answerSubmission.id) {
        answerSubmissions[index] = newData;
        submissionUpdated = true;
        break;
      }
    }
    if (!submissionUpdated) {
      if (
        JSON.stringify(emptyAnswerSubmission) ===
        JSON.stringify(answerSubmissions[0])
      ) {
        answerSubmissions[0] = newData;
      } else {
        answerSubmissions.push(newData);
      }
    }

    console.log(answerSubmission);
    console.log(answerSubmissions);
  }, [answerSubmission]);

  useEffect(() => {
    // Executed on page load to fetch credentials from localStorage
    const credentialsString = localStorage.getItem("CREDENTIALS");
    const credentialsObject: QuizCredentialsType = credentialsString
      ? JSON.parse(credentialsString)
      : undefined;
    if (credentialsObject) {
      axios
        .post(API, {
          id: credentialsObject.id,
          password: credentialsObject.password,
        })
        .then((res) => {
          const questions: QuestionItemType[] = res.data;
          setQuestions(questions);
        })
        .catch((err) => {
          alert(err.response.data);
          localStorage.removeItem("CREDENTIALS");
        });
    }
  }, []);

  let max = 0;
  useEffect(() => {
    if (questions) {
      if (questions.length > 0) {
        max = questions.length;
      }
    }
  });

  function handleBack() {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  }

  function handleNext() {
    if (index < max - 1) {
      setIndex((prev) => prev + 1);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.questions_container}>
        {!!questions && questions[index] && (
          <QuestionBox
            setAnswerSubmission={setAnswerSubmission}
            questionNumber={index + 1}
            questionText={questions[index].questionText}
            answers={questions[index].answers}
            correctAnswer={questions[index].correctAnswer}
          />
        )}
      </div>
      <div className={styles.button_parent}>
        <Button text="Back" action={handleBack} />
        <Button text="Next" action={handleNext} />
      </div>
    </div>
  );
}

export default Questions;
