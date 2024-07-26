import { useState } from "react";
import JoinForm from "../components/join-form";
import Nav from "../components/nav";
import { useAppSelector } from "../redux/hooks";
import styles from "../styles/join.module.css";
import CountDown from "../components/countdown";

export type JoinStage = "initial" | "final";

export default function Join() {
  // In the "initial" stage, user will fill up quiz id, full-name and password for the quiz,
  // which will be sent to server and this state will be set to "final"
  const [joinStage, setJoinStage] = useState<JoinStage>("initial");

  const quizQuestions = useAppSelector((state) => state.quizQuestions);

  const [_timerEnded, setTimerEnded] = useState(false);

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
                      />
                      <span>{a}</span>
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </form>
          <div className={styles.quiz_progress}>
            <CountDown time={0} setEnded={setTimerEnded} largeFont />
          </div>
        </>
      )}
    </div>
  );
}
