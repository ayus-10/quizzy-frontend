import { useState, useEffect, useRef } from "react";
import QuestionForm from "../components/QuestionForm";
import styles from "../styles/Create.module.css";
import Button from "../components/Button";

export type questionItemType = {
  id: number | null;
  questionText: string;
  answers: {
    answerText: string;
    isCorrect: boolean | null;
  }[];
};

function Create() {
  const [questionNumber, setQuestionNumber] = useState(1); // Used to add another QuestionForm in the page

  // Create an empty object that will be set to initial questionItem state
  const emptyQuestionItem: questionItemType = {
    id: null,
    questionText: "",
    answers: [
      {
        answerText: "",
        isCorrect: null,
      },
    ],
  };

  const [questionItem, setQuestionItem] =
    useState<questionItemType>(emptyQuestionItem);

  const questionItemArrayRef = useRef<questionItemType[]>([]);

  useEffect(() => {
    const questionItemArray = questionItemArrayRef.current;
    if (questionItemArray.length > 0) {
      questionItemArray.forEach((object, index) => {
        if (questionItem.id) {
          if (object.id === questionItem.id) {
            questionItemArray[index] = questionItem;
            return;
          } else {
            questionItemArray.push(questionItem);
            return;
          }
        }
      });
    } else {
      questionItemArray.push(questionItem);
    }
  }, [questionItem]);

  function addQuestion() {
    setQuestionNumber((prev) => prev + 1);
  }

  return (
    <div className={styles.container}>
      <div className={styles.questions}>
        {Array.from({ length: questionNumber }).map((_, index) => (
          <QuestionForm
            key={index}
            questionNumber={index + 1}
            setQuestionItem={setQuestionItem}
            emptyQuestionItem={emptyQuestionItem}
          />
        ))}
        <div className={styles.separator}></div>
        <div className={styles.button_parent}>
          <Button text="Add question" action={addQuestion} />
          <Button
            text="Submit quiz"
            action={() => console.log(questionItemArrayRef.current)}
          />
        </div>
      </div>
    </div>
  );
}

export default Create;
