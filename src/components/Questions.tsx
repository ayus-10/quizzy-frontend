import { useEffect, useState } from "react";
import styles from "../styles/Questions.module.css";
import QuestionBox from "./QuestionBox";
import axios from "axios";
import { API_URL } from "../config/api";
import type { QuizCredentialsType } from "../index.d.ts";
import type { QuestionItemType } from "../index.d.ts";

function Questions() {
  const API = API_URL + "quiz/questions";

  const [questions, setQuestions] = useState<QuestionItemType[]>();

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

  return (
    <div className={styles.questions_container}>
      {questions &&
        questions.map((question, index) => (
          <QuestionBox
            key={index}
            questionNumber={index}
            questionText={question.questionText}
            answers={question.answers}
          />
        ))}
    </div>
  );
}

export default Questions;
