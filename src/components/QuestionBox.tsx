import styles from "../styles/QuestionBox.module.css";

type QuestionBoxProps = {
  questionNumber: number;
  questionText: string;
  answers: {
    answerText: string;
    isCorrect: boolean | null;
  }[];
};

function QuestionBox(props: QuestionBoxProps) {
  const { questionNumber, questionText, answers } = props;

  return (
    <div className={styles.question_box}>
      <h2 className={styles.question_text}>
        {`(${questionNumber}) ${questionText}`}
      </h2>
      <div className={styles.answers_box}>
        {answers.map((answer, index) => (
          <label className={styles.answer_parent} key={index}>
            <input type="radio" name={`question${questionNumber}`} />
            <p className={styles.answer}>{answer.answerText}</p>
          </label>
        ))}
      </div>
    </div>
  );
}

export default QuestionBox;
