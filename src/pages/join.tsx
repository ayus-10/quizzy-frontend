import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "../styles/join.module.css";
import commonStyles from "../styles/common-styles.module.css";
import { BeatLoader } from "react-spinners";
import Button from "../components/button";
import Nav from "../components/nav";
import { BASE_API_URL } from "../config";
import axios from "axios";
import { useAppDispatch } from "../redux/hooks";
import { setAlertMessage } from "../redux/slices/alert-message.slice";
import SavedQuizCard from "../components/saved-quiz-card";
import { JoinedQuiz } from "../interfaces/joined-quiz.interface";

export default function Join() {
  const fullnameInput = useRef<HTMLInputElement>(null);
  const quizIdInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const [savedQuizzes, setSavedQuizzes] = useState<JoinedQuiz[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const prevJoinedQuizzes = localStorage.getItem("JOINED_QUIZZES");
    if (!prevJoinedQuizzes) {
      localStorage.setItem("JOINED_QUIZZES", JSON.stringify([]));
    } else {
      setSavedQuizzes(JSON.parse(prevJoinedQuizzes));
    }
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const apiUrl = `${BASE_API_URL}/join/verify`;

    setLoading(true);

    try {
      const res = await axios.post<JoinedQuiz>(apiUrl, {
        id: quizIdInput.current?.value,
        password: passwordInput.current?.value,
        fullname: fullnameInput.current?.value,
      });
      const joinedQuiz = res.data;
      const prevJoinedQuizzes: JoinedQuiz[] = JSON.parse(
        localStorage.getItem("JOINED_QUIZZES") as string
      );
      const alreadyJoined = prevJoinedQuizzes.some(
        (quiz) => quiz.quizId === joinedQuiz.quizId
      );
      if (!alreadyJoined) {
        prevJoinedQuizzes.push(joinedQuiz);
        localStorage.setItem(
          "JOINED_QUIZZES",
          JSON.stringify(prevJoinedQuizzes)
        );
        setSavedQuizzes((prev) => [...prev, joinedQuiz]);
        dispatch(
          setAlertMessage({
            message: "Successfully joined and saved the quiz",
            status: "success",
          })
        );
      }
      dispatch(
        setAlertMessage({
          message: "Please join via the saved quizzes section",
          status: "warning",
        })
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        dispatch(
          setAlertMessage({
            message: err.response?.data ?? err.message,
            status: "error",
          })
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Nav />
      <div className={styles.container}>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
          <h1 className={styles.title}>Join a Quiz</h1>
          <div className={commonStyles.input_div}>
            <input
              ref={fullnameInput}
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
        <div className={styles.quizzes_wrapper}>
          <h1 className={styles.title}>Saved Quizzes</h1>
          <div className={styles.quizzes}>
            {savedQuizzes.length === 0 ? (
              <p>
                Quizzes will appear here upon successful join, allowing you to
                start or view the results.
              </p>
            ) : (
              savedQuizzes.map((quiz) => (
                <SavedQuizCard key={quiz.quizId} quizDetails={quiz} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
