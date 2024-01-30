import { useEffect, useState } from "react";
import styles from "../styles/Questions.module.css";
import QuestionBox from "./QuestionBox";
import axios from "axios";
import { API_URL } from "../config/api";
import type { quizCredentialsType } from "../routes/Quiz";
import type { questionItemType } from "../routes/Create";

function Questions() {
  const API = API_URL + "quiz/questions";

  const [questions, setQuestions] = useState<questionItemType[]>();

  useEffect(() => {
    // Executed on page load to fetch credentials from localStorage
    const credentialsString = localStorage.getItem("CREDENTIALS");
    const credentialsObject: quizCredentialsType = credentialsString
      ? JSON.parse(credentialsString)
      : undefined;
    if (credentialsObject) {
      axios
        .post(API, {
          id: credentialsObject.id,
          password: credentialsObject.password,
        })
        .then((res) => {
          const questions: questionItemType[] = res.data;
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
