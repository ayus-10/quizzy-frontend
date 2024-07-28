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

export type JoinStage = "initial" | "final";

export default function Join() {
  // In the "initial" stage, user will fill up quiz id, full-name and password for the quiz,
  // which will be sent to server and this state will be set to "final"
  const [joinStage, setJoinStage] = useState<JoinStage>("initial");

  const quizQuestions = useAppSelector(
    (state) => state.quizQuestions.questions
  );

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
          message: "Time's up, submit the quiz now",
          status: "warning",
        })
      );
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

  function submitQuiz(e: FormEvent) {
    e.preventDefault();
    if (!formRef.current) {
      return;
    }
    const serializedData = serializeQuizSubmission(formRef.current);
    console.log(serializedData);
    localStorage.removeItem("AUTO_JOIN_DATA");
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
              {quizQuestions.map((_, i) => {
                const isAttempted = checkAttemptedQuestionNumbers(i + 1);
                return (
                  <div
                    key={i}
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
              <Button title="Submit" submitForm />
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
