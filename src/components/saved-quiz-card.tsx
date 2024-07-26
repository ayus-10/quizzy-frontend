import { useState } from "react";
import { JoinedQuiz } from "../interfaces/joined-quiz.interface";
import styles from "../styles/saved-quiz-card.module.css";
import CountDown from "./countdown";
import Button from "./button";

type SavedQuizCardProps = {
  quizDetails: JoinedQuiz;
  startQuiz: (token: string) => void;
};

export default function SavedQuizCard(props: SavedQuizCardProps) {
  const { quizDetails, startQuiz } = props;

  const [countdownEnded, setCountdownEnded] = useState(false);

  function getLocalTime(timestamp: number) {
    const dateObject = new Date(timestamp);
    return `${dateObject.toLocaleTimeString()} (${dateObject.toLocaleDateString()})`;
  }

  return (
    <div className={styles.quiz_card}>
      <p>ID: {quizDetails.quizId}</p>
      <p>Title: {quizDetails.quizTitle}</p>
      <p>Starts: {getLocalTime(quizDetails.startTime)}</p>
      {!countdownEnded ? (
        <CountDown time={quizDetails.startTime} setEnded={setCountdownEnded} />
      ) : (
        <div>
          <Button
            title="Start"
            action={() => startQuiz(quizDetails.joinToken)}
          />
        </div>
      )}
    </div>
  );
}
