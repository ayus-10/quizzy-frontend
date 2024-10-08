import { FormEvent, useEffect, useRef, useState } from "react";
import JoinForm from "../components/join-form";
import Nav from "../components/nav";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import styles from "../styles/join.module.css";
import CountDown from "../components/countdown";
import { FaChevronLeft } from "react-icons/fa";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";
import serializeSubmittedQuestions from "../utils/serialize-submitted-questions";
import { setAlertMessage } from "../redux/slices/alert-message.slice";
import axios from "axios";
import { BASE_API_URL } from "../config";
import { BeatLoader } from "react-spinners";
import { QuizSubmission } from "../interfaces/quiz-submission.interface";
import { setSubmittedQuizIds } from "../redux/slices/submitted-quiz-ids.slice";

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
    // IDs of submitted quiz will be stored in a redux slice so that instead of "Start"
    // "Result" button can be displayed by "saved-quiz-card.tsx" component
    const submittedQuizzesString = localStorage.getItem("RESULT_DATA");

    const submittedQuizzes = JSON.parse(
      submittedQuizzesString as string
    ) as QuizSubmission[];

    if (!Array.isArray(submittedQuizzes)) {
      return;
    }

    const submittedQuizIds: string[] = [];

    submittedQuizzes.forEach((sq) => {
      submittedQuizIds.push(sq.quizId);
    });

    dispatch(setSubmittedQuizIds(submittedQuizIds));
  }, []);

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
    const submittedQuestions = serializeSubmittedQuestions(formRef.current);

    const apiUrl = `${BASE_API_URL}/join/submit`;

    try {
      const res = await axios.post(apiUrl, {
        fullname,
        joinToken,
        submittedQuestions,
      });

      const { quizId, submittedBy } = res.data;

      const result: QuizSubmission = { quizId, submittedBy };

      const prevResultString = localStorage.getItem("RESULT_DATA");
      if (!prevResultString) {
        localStorage.setItem("RESULT_DATA", JSON.stringify([result]));
      } else {
        const prevResult = JSON.parse(
          prevResultString as string
        ) as QuizSubmission[];

        localStorage.setItem(
          "RESULT_DATA",
          JSON.stringify([...prevResult, result])
        );
      }

      dispatch(
        setAlertMessage({
          message: "Quiz submitted successfully",
          status: "success",
        })
      );

      localStorage.removeItem("AUTO_JOIN_DATA");
      setJoinStage("initial");

      navigate(`/result/${result.quizId}`);
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
              type="button"
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
