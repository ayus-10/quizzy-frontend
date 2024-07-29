import { FormEvent, useEffect, useRef, useState } from "react";
import JoinForm from "../components/join-form";
import Nav from "../components/nav";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import styles from "../styles/join.module.css";
import CountDown from "../components/countdown";
import { FaChevronLeft } from "react-icons/fa";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";
import serializeQuizSubmission from "../utils/serialize-quiz-submission";
import { setAlertMessage } from "../redux/slices/alert-message.slice";
import axios from "axios";
import { BASE_API_URL } from "../config";
import { BeatLoader } from "react-spinners";

export type JoinStage = "initial" | "final";

export default function Join() {
  // In the "initial" stage, user will fill up quiz id, full-name and password for the quiz,
  // which will be sent to server and this state will be set to "final"
  const [joinStage, setJoinStage] = useState<JoinStage>("initial");

  const quizQuestions = useAppSelector(
    (state) => state.quizQuestions.questions
  );

  const [loading, setLoading] = useState(false);

  const [timerEnded, setTimerEnded] = useState(false);

  const [showProgress, setShowProgress] = useState(window.innerWidth > 768);

  const endTime = useAppSelector((state) => state.quizQuestions.endTime);

  const [attemptedQuestionNumbers, setAttemptedQuestionNumbers] = useState<
    number[]
  >([]);

  const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (timerEnded) {
      dispatch(
        setAlertMessage({
          message: "Time's up, submitting the quiz now",
          status: "warning",
        })
      );
      submitQuiz(null);
    }
  }, [timerEnded]);

  function updateAttemptedQuestionNumbers(index: number) {
    if (!attemptedQuestionNumbers.includes(index)) {
      setAttemptedQuestionNumbers((prev) => [...prev, index]);
    }
  }

  function checkAttemptedQuestionNumbers(index: number) {
    return attemptedQuestionNumbers.includes(index);
  }

  function cancelQuiz() {
    localStorage.removeItem("AUTO_JOIN_DATA");
    navigate("/");
  }

  async function submitQuiz(e: FormEvent | null) {
    if (e) {
      e.preventDefault();
    }

    setLoading(true);

    if (!formRef.current) {
      return;
    }

    const autoJoinData = JSON.parse(
      localStorage.getItem("AUTO_JOIN_DATA") as string
    );

    const joinToken = autoJoinData.joinToken as string;
    const fullname = autoJoinData.fullname as string;
    const quizSubmission = serializeQuizSubmission(formRef.current);

    const apiUrl = `${BASE_API_URL}/join/submit/${joinToken}`;

    try {
      await axios.post(apiUrl, { fullname, quizSubmission }); // TODO: extract result from response
      dispatch(
        setAlertMessage({
          message: "Quiz submitted successfully",
          status: "success",
        })
      );
      localStorage.removeItem("AUTO_JOIN_DATA");
      setJoinStage("initial");
    } catch (err) {
      dispatch(
        setAlertMessage({ message: "Unable to submit quiz", status: "error" })
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <Nav />
      {joinStage === "initial" ? (
        <JoinForm setStage={setJoinStage} />
      ) : (
        <form
          ref={formRef}
          className={styles.question_form}
          onSubmit={(e) => submitQuiz(e)}
        >
          {quizQuestions.map((q, question_index) => (
            <div key={question_index} className={styles.question_input}>
              <p className={styles.question_text}>
                {question_index + 1}. {q.question}
              </p>
              <div className={styles.answer_inputs}>
                {q.answerChoices.map((a, answer_index) => (
                  <div key={answer_index} className={styles.answer_input}>
                    <label htmlFor={`answer${question_index}_${answer_index}`}>
                      <div className={styles.radio_input}>
                        <input
                          type="radio"
                          name={q.questionId}
                          id={`answer${question_index}_${answer_index}`}
                          onClick={() =>
                            updateAttemptedQuestionNumbers(question_index + 1)
                          }
                        />
                      </div>
                      <span className={styles.answer_text}>{a}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div
            className={`${styles.quiz_progress} ${
              showProgress && styles.quiz_progress_visible
            }`}
          >
            <button
              onClick={() => setShowProgress((prev) => !prev)}
              className={`${styles.toggle_quiz_progress} ${
                showProgress && styles.toggled
              }`}
            >
              <FaChevronLeft />
            </button>
            <h2>Time remaining:</h2>
            <CountDown time={endTime} setEnded={setTimerEnded} largeFont />
            <h2>Questions:</h2>
            <div className={styles.progress}>
              {quizQuestions.map((q, i) => {
                const isAttempted = checkAttemptedQuestionNumbers(i + 1);
                return (
                  <div
                    key={`progress_icon_${q.questionId}`}
                    className={`${styles.question_progress} ${
                      isAttempted && styles.question_progress_attempted
                    }`}
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>
            <div className={styles.options}>
              <Button title="Cancel" secondaryColor action={cancelQuiz} />
              <Button title="Submit" submitForm>
                {loading ? <BeatLoader color="#fff" /> : undefined}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
