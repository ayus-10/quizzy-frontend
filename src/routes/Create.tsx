import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API } from "../config/api";
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
  const [saving, setSaving] = useState(false);

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

  const questionItemArrayRef = useRef<questionItemType[]>([emptyQuestionItem]);

  useEffect(() => {
    const questionItemArray = questionItemArrayRef.current;
    let itemUpdated = false;
    if (questionItem.id) {
      for (let index = 0; index < questionItemArray.length; index++) {
        if (questionItemArray[index].id === questionItem.id) {
          questionItemArray[index] = questionItem; // Update previous object
          itemUpdated = true;
          break;
        }
      }
      if (!itemUpdated) {
        // If no object was updated previously, push the object to array
        questionItemArray.push(questionItem);
      }
    }
  }, [questionItem]);

  function addQuestion() {
    setQuestionNumber((prev) => prev + 1);
  }

  function handleSubmitQuiz() {
    setSaving(true);

    axios
      .post(API, questionItemArrayRef.current)
      .then((res) => {
        localStorage.setItem("QUIZ_INFO", JSON.stringify(res.data));
        setSaving(false);
        window.location.href = "/info";
      })
      .catch((err) => {
        setSaving(false);
        alert(err.message);
      });
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
            text={saving ? "SyncLoader" : "Submit quiz"}
            action={handleSubmitQuiz}
          />
        </div>
      </div>
    </div>
  );
}

export default Create;
