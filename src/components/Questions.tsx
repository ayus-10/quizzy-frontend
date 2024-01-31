import { FormEvent, useEffect, useRef, useState } from "react";
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

  const [questions, setQuestions] = useState<QuestionItemType[]>(); // Used to store questions array fetched from server

  const emptyAnswerSubmission: AnswerSubmissionsType = {
    id: null,
    chosenAnswer: null,
    isCorrect: null,
  }; // Initial value

  const [answerSubmission, setAnswerSubmission] =
    useState<AnswerSubmissionsType>(emptyAnswerSubmission); // Used to store answer submission for each question box

  const answerSubmissionsRef = useRef<AnswerSubmissionsType[]>([
    emptyAnswerSubmission,
  ]); // Used to store all answer submissions

  const answerSubmissions = answerSubmissionsRef.current;

  useEffect(() => {
    // Executed whenever answer submission for any of the question box changes
    let newData: AnswerSubmissionsType = {
      id: answerSubmission.id,
      chosenAnswer: answerSubmission.chosenAnswer,
      isCorrect: answerSubmission.isCorrect,
    };

    let submissionUpdated = false;

    for (let index = 0; index < answerSubmissions.length; index++) {
      if (answerSubmissions[index].id === answerSubmission.id) {
        answerSubmissions[index] = newData; // Update previous answer submission
        submissionUpdated = true;
        break;
      }
    }
    if (!submissionUpdated) {
      if (
        JSON.stringify(emptyAnswerSubmission) ===
        JSON.stringify(answerSubmissions[0])
      ) {
        answerSubmissions[0] = newData; // Update initial value
      } else {
        answerSubmissions.push(newData); // Add new answer submission
      }
    }
  }, [answerSubmission]);

  useEffect(() => {
    // Executed on page load to fetch credentials from localStorage and hit server to get questions array
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

  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    let count = 0;
    if (
      JSON.stringify(emptyAnswerSubmission) !==
      JSON.stringify(answerSubmissions[0])
    ) {
      answerSubmissions.forEach(() => {
        count++;
      });
    }
    setDoneCount(count);
  }, [answerSubmission]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Calculate score
    let score = 0;
    answerSubmissions.forEach((object) => {
      if (object.isCorrect) {
        score++;
      }
    });

    alert(`Your score is ${score} out of ${questions?.length}`);

    localStorage.removeItem("CREDENTIALS");

    window.location.reload();
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      {!!questions && (
        <>
          <div className={styles.button_parent}>
            <h2>
              {doneCount} out of {questions.length} done
            </h2>
            <Button text="Submit" />
          </div>
          <div className={styles.questions_container}>
            {questions.map((question, index) => (
              <QuestionBox
                key={index}
                setAnswerSubmission={setAnswerSubmission}
                questionNumber={index + 1}
                questionText={question.questionText}
                answers={question.answers}
                correctAnswer={question.correctAnswer}
              />
            ))}
          </div>
        </>
      )}
    </form>
  );
}

export default Questions;
