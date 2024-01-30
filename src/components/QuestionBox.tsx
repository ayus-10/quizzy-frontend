import styles from "../styles/QuestionBox.module.css";
import type { AnswerSubmissionsType } from "../index.d.ts";
import { Dispatch, SetStateAction } from "react";

type QuestionBoxProps = {
  setAnswerSubmission: Dispatch<SetStateAction<AnswerSubmissionsType>>;
  questionNumber: number;
  questionText: string;
  answers: {
    answerText: string;
    isCorrect: boolean | null;
  }[];
};

function QuestionBox(props: QuestionBoxProps) {
  const { setAnswerSubmission, questionNumber, questionText, answers } = props;

  function handleAnswer(isCorrect: boolean | null) {
    let answerSubmission: AnswerSubmissionsType = {
      id: questionNumber,
      isCorrect: isCorrect,
    };

    setAnswerSubmission(answerSubmission);
  }

  return (
    <div className={styles.question_box}>
      <h2 className={styles.question_text}>
        {`(${questionNumber}) ${questionText}`}
      </h2>
      <div className={styles.answers_box}>
        {answers.map((answer, index) => (
          <label className={styles.answer_parent} key={index}>
            <input
              type="radio"
              name={`question${questionNumber}`}
              onChange={() => handleAnswer(answer.isCorrect)}
            />
            <p className={styles.answer}>{answer.answerText}</p>
          </label>
        ))}
      </div>
    </div>
  );
}

export default QuestionBox;
