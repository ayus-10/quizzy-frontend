import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "../styles/join-form.module.css";
import commonStyles from "../styles/common-styles.module.css";
import { BeatLoader } from "react-spinners";
import Button from "./button";
import { BASE_API_URL } from "../config";
import axios from "axios";
import { useAppDispatch } from "../redux/hooks";
import { setAlertMessage } from "../redux/slices/alert-message.slice";
import SavedQuizCard from "./saved-quiz-card";
import { JoinedQuiz } from "../interfaces/joined-quiz.interface";
import { JoinStage } from "../pages/join";
import { setQuizQuestions } from "../redux/slices/quiz-questions.slice";
import { FetchedQuizQuestion } from "../interfaces/fetched-quiz-question.interface";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type JoinFormProps = {
  setStage: Dispatch<SetStateAction<JoinStage>>;
};

export default function JoinForm(props: JoinFormProps) {
  const { setStage } = props;

  const fullnameInput = useRef<HTMLInputElement>(null);
  const quizIdInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();

  const [savedQuizzes, setSavedQuizzes] = useState<JoinedQuiz[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // After the join quiz form is successfully submitted, the info required to start the
    // quiz (sent by the server) will be stored in local storage and then displayed on the page
    const prevJoinedQuizzes = localStorage.getItem("JOINED_QUIZZES");
    if (!prevJoinedQuizzes) {
      localStorage.setItem("JOINED_QUIZZES", JSON.stringify([]));
    } else {
      setSavedQuizzes(JSON.parse(prevJoinedQuizzes));
    }

    // Check for previous unsubmitted quiz and auto start if applicable
    const autoJoinDataString = localStorage.getItem("AUTO_JOIN_DATA");
    if (!autoJoinDataString) {
      return;
    }
    const autoJoinData = JSON.parse(autoJoinDataString) as JoinedQuiz;
    async function autoStartQuiz(data: JoinedQuiz) {
      await handleQuizStart(data);
    }
    autoStartQuiz(autoJoinData);
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
      } else {
        dispatch(
          setAlertMessage({
            message: "You have already joined this quiz",
            status: "warning",
          })
        );
      }
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

  async function handleQuizStart(quiz: JoinedQuiz) {
    const apiUrl = `${BASE_API_URL}/join/quiz`;

    try {
      // If the request was successful, join stage will be set to "final" which will display the quiz
      // on the page instead of this component
      // These questions will then be saved in a redux slice
      // The quiz object will be saved to local storage, in order to auto start quiz if user reloads
      const res = await axios.post<FetchedQuizQuestion[]>(apiUrl, {
        joinToken: quiz.joinToken,
      });
      setStage("final");
      localStorage.setItem("AUTO_JOIN_DATA", JSON.stringify(quiz));
      dispatch(
        setQuizQuestions({ endTime: quiz.endTime, questions: res.data })
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        dispatch(
          setAlertMessage({
            message: err.response?.data ?? err.message,
            status: "error",
          })
        );
        localStorage.removeItem("AUTO_JOIN_DATA");
      }
    }
  }

  return (
    <div className={styles.join_form}>
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
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            id="password"
            className={commonStyles.input}
          />
          <button
            className={commonStyles.toggle_password}
            onClick={() => setShowPassword((prev) => !prev)}
            type="button"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
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
        <h1 className={`${styles.title} ${styles.padding_x}`}>Saved Quizzes</h1>
        {savedQuizzes.length === 0 ? (
          <p>
            Quizzes will appear here upon successful join, allowing you to start
            or view the results.
          </p>
        ) : (
          <div className={styles.quizzes}>
            {savedQuizzes.map((quiz) => (
              <SavedQuizCard
                key={quiz.quizId}
                quizDetails={quiz}
                startQuiz={handleQuizStart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
