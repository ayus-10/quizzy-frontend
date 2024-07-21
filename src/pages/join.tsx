import { FormEvent, useRef, useState } from "react";
import styles from "../styles/join.module.css";
import commonStyles from "../styles/common-styles.module.css";
import { BeatLoader } from "react-spinners";
import Button from "../components/button";
import Nav from "../components/nav";

export default function Join() {
  const usernameInput = useRef<HTMLInputElement>(null);
  const quizIdInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <>
      <Nav />
      <div className={styles.container}>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
          <h1 className={styles.title}>Join a Quiz</h1>
          <div className={commonStyles.input_div}>
            <input
              ref={usernameInput}
              type="text"
              placeholder="Your Full-name"
              id="fullName"
              className={commonStyles.input}
            />
          </div>
          <div className={commonStyles.input_div}>
            <input
              ref={quizIdInput}
              type="text"
              placeholder="Quiz ID"
              id="quizId"
              className={commonStyles.input}
            />
          </div>
          <div className={commonStyles.input_div}>
            <input
              ref={passwordInput}
              type="password"
              placeholder="Password"
              id="password"
              className={commonStyles.input}
            />
          </div>
          <div className={commonStyles.center}>
            {loading ? (
              <BeatLoader color="#f43f5e" />
            ) : (
              <Button title="Join" submitForm />
            )}
          </div>
        </form>
        <div className={styles.divider}></div>
        <div className={styles.quizzes}>
          <h1 className={styles.title}>Saved Quizzes</h1>
        </div>
      </div>
    </>
  );
}
