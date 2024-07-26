import { useState } from "react";
import JoinForm from "../components/join-form";
import Nav from "../components/nav";
import { useAppSelector } from "../redux/hooks";
import styles from "../styles/join.module.css";
import CountDown from "../components/countdown";
import { FaChevronRight } from "react-icons/fa";
import Button from "../components/button";

export type JoinStage = "initial" | "final";

export default function Join() {
  // In the "initial" stage, user will fill up quiz id, full-name and password for the quiz,
  // which will be sent to server and this state will be set to "final"
  const [joinStage, setJoinStage] = useState<JoinStage>("initial");

  const quizQuestions = useAppSelector(
    (state) => state.quizQuestions.questions
  );

  const [_timerEnded, setTimerEnded] = useState(false);

  const [showProgress, setShowProgress] = useState(true);

  const endTime = useAppSelector((state) => state.quizQuestions.endTime);

  const [attemptedQuestionNumbers, setAttemptedQuestionNumbers] = useState<
    number[]
  >([]);

  function updateAttemptedQuestionNumbers(index: number) {
    if (!attemptedQuestionNumbers.includes(index)) {
      setAttemptedQuestionNumbers((prev) => [...prev, index]);
    }
  }

  function checkAttemptedQuestionNumbers(index: number) {
    return attemptedQuestionNumbers.includes(index);
  }

  return (
    <div className={styles.container}>
      <Nav />
      {joinStage === "initial" ? (
        <JoinForm setStage={setJoinStage} />
      ) : (
        <>
          <form id="questionInputs" className={styles.question_form}>
            {quizQuestions.map((q, question_index) => (
              <div key={question_index} className={styles.question_input}>
                <p className={styles.question_text}>
                  {question_index + 1}. {q.question}
                </p>
                {q.answerChoices.map((a, answer_index) => (
                  <div key={answer_index} className={styles.answer_input}>
                    <label htmlFor={`answer${question_index}_${answer_index}`}>
                      <input
                        type="radio"
                        name={`answer${question_index}`}
                        id={`answer${question_index}_${answer_index}`}
                        onClick={() =>
                          updateAttemptedQuestionNumbers(question_index + 1)
                        }
                      />
                      <span>{a}</span>
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </form>
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
              <FaChevronRight />
            </button>
            <CountDown time={endTime} setEnded={setTimerEnded} largeFont />
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
              <Button title="Cancel" secondaryColor />
              <Button title="Submit" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
