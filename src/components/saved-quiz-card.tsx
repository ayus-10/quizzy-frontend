import { useState } from "react";
import { JoinedQuiz } from "../interfaces/joined-quiz.interface";
import styles from "../styles/saved-quiz-card.module.css";
import CountDown from "./countdown";
import Button from "./button";
import { useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";

type SavedQuizCardProps = {
  quizDetails: JoinedQuiz;
  startQuiz: (quiz: JoinedQuiz) => void;
};

export default function SavedQuizCard(props: SavedQuizCardProps) {
  const { quizDetails, startQuiz } = props;

  const [countdownEnded, setCountdownEnded] = useState(false);

  const submittedQuizIds = useAppSelector((state) => state.submittedQuizIds);

  const navigate = useNavigate();

  function getLocalTime(timestamp: number) {
    const dateObject = new Date(timestamp);
    return `${dateObject.toLocaleTimeString()} (${dateObject.toLocaleDateString()})`;
  }

  return (
    <div className={styles.quiz_card}>
      <p>ID: {quizDetails.quizId}</p>
      <p>Title: {quizDetails.quizTitle}</p>
      <p>Starts: {getLocalTime(quizDetails.startTime)}</p>
      {submittedQuizIds.includes(quizDetails.quizId) ? (
        <div>
          <Button
            title="Result"
            action={() => navigate(`/result/${quizDetails.quizId}`)}
          />
        </div>
      ) : countdownEnded ? (
        <div>
          <Button title="Start" action={() => startQuiz(quizDetails)} />
        </div>
      ) : (
        <CountDown time={quizDetails.startTime} setEnded={setCountdownEnded} />
      )}
    </div>
  );
}
