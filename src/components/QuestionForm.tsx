import { Dispatch, SetStateAction, FormEvent } from "react";
import Button from "./Button";
import styles from "../styles/QuestionForm.module.css";

type QuestionFormProps = {
  questionNumber: number;
  setQuestionNumber: Dispatch<SetStateAction<number>>;
};

function QuestionForm(props: QuestionFormProps) {
  const { questionNumber, setQuestionNumber } = props;

  function addQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setQuestionNumber((prev: number) => prev + 1);
  }

  return (
    <form className={styles.form} onSubmit={addQuestion}>
      <div className={styles.input_parent}>
        <div className={styles.question}>
          <h2 className={styles.title}>Question number: {questionNumber}</h2>
          <input
            type="text"
            className={styles.input}
            placeholder="Question text goes here..."
          />
        </div>
        <div className={styles.answers_parent}>
          <h2 className={styles.title}>Answer choices:</h2>
          <div className={styles.answers}>
            {Array.from({ length: 4 }).map((_, index) => {
              return (
                <div className={styles.answer} key={index}>
                  <input type="radio" name={`question${questionNumber}`} />
                  <input
                    className={styles.input}
                    id={`answer${index}`}
                    type="text"
                    placeholder="Add answer choice..."
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.button_parent}>
        <Button text="Add question" />
      </div>
    </form>
  );
}

export default QuestionForm;
