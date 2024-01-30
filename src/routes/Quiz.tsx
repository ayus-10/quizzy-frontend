import { useEffect, useState } from "react";
import JoinForm from "../components/JoinForm";
import styles from "../styles/Quiz.module.css";
import Questions from "../components/Questions";
import type { QuizCredentialsType } from "../index.d.ts";

function Quiz() {
  // After user submits the form in JoinForm component, server validates the input and returns it if valid which will be stored in this state
  const [credentials, setCredentials] = useState<QuizCredentialsType>({
    id: "",
    password: "",
  });

  useEffect(() => {
    // When credentials state changes, its value will be saved to localStorage
    if (credentials.id !== "" && credentials.password !== "") {
      localStorage.setItem("CREDENTIALS", JSON.stringify(credentials));
    }
  }, [credentials]);

  useEffect(() => {
    // Executed on page load to fetch credentials from localStorage to state
    const credentialsString = localStorage.getItem("CREDENTIALS");
    const credentialsObject: QuizCredentialsType = credentialsString
      ? JSON.parse(credentialsString)
      : undefined;
    if (credentialsObject) {
      if (credentials.id === "" && credentials.password === "") {
        setCredentials({
          id: credentialsObject.id,
          password: credentialsObject.password,
        });
      }
    }
  }, []);

  return (
    <>
      {credentials.id === "" || credentials.password === "" ? (
        <div className={styles.join_form}>
          <JoinForm setCredentials={setCredentials} />
        </div>
      ) : (
        <div className={styles.questions}>
          <Questions />
        </div>
      )}
    </>
  );
}

export default Quiz;
