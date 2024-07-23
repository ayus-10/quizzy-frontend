import { useState } from "react";
import { JoinedQuiz } from "../interfaces/joined-quiz.interface";
import styles from "../styles/saved-quiz-card.module.css";
import CountDown from "./countdown";
import getUTCTimeStamp from "../utils/get-utc-time";
import Button from "./button";

export default function SavedQuizCard({
  quizDetails,
}: {
  quizDetails: JoinedQuiz;
}) {
  const [currentTime] = useState(() => getUTCTimeStamp(undefined));

  function getLocalTime(timestamp: number) {
    const dateObject = new Date(timestamp);
    return `${dateObject.toLocaleTimeString()} (${dateObject.toLocaleDateString()})`;
  }

  return (
    <div className={styles.quiz_card}>
      <p>ID: {quizDetails.quizId}</p>
      <p>Title: {quizDetails.quizTitle}</p>
      <p>Starts: {getLocalTime(quizDetails.startTime)}</p>
      {quizDetails.startTime - currentTime > 0 ? (
        <CountDown time={quizDetails.startTime} />
      ) : (
        <div>
          <Button title="Start" largeFont />
        </div>
      )}
    </div>
  );
}
