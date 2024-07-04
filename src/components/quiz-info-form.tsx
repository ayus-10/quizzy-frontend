import { FormEvent, SetStateAction, useRef, Dispatch } from "react";
import saveQuizInfo from "../utils/save-quiz-info";
import axios from "axios";
import Button from "./button";
import styles from "../styles/quiz-info-form.module.css";
import { CreationStage } from "../routes/admin/create";

type QuizInfoFormProps = {
  setStage: Dispatch<SetStateAction<CreationStage>>;
};

export default function QuizInfoForm(props: QuizInfoFormProps) {
  const { setStage } = props;

  const titleInputElement = useRef<HTMLInputElement>(null);
  const startTimeInputElement = useRef<HTMLInputElement>(null);
  const endTimeInputElement = useRef<HTMLInputElement>(null);

  function getUTCTimeStamp(date: string) {
    const utcDateString = new Date(date).toISOString();
    const timeStamp = new Date(utcDateString).getTime();
    return timeStamp;
  }

  async function handleForm(e: FormEvent) {
    e.preventDefault();

    const title = titleInputElement.current?.value as string;
    const startTime = startTimeInputElement.current?.value as string;
    const endTime = endTimeInputElement.current?.value as string;

    if (!title || !startTime || !endTime) {
      return;
    }

    const quizInfo = {
      title,
      startTime: getUTCTimeStamp(startTime),
      endTime: getUTCTimeStamp(endTime),
    };

    const res = await saveQuizInfo(quizInfo);
    if (res) {
      if (axios.isAxiosError(res)) {
        alert(res.response?.data);
      } else {
        alert(res.data);
        setStage("final");
      }
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.info_form} onSubmit={(e) => handleForm(e)}>
        <h1 className={styles.title}>Create a test</h1>
        <div className={styles.input_div}>
          <label htmlFor="titleInput">Title</label>
          <input type="text" id="titleInput" ref={titleInputElement} />
        </div>
        <div className={styles.date_input_div}>
          <div className={styles.input_div}>
            <label htmlFor="startTimeInput">Start time</label>
            <input
              type="datetime-local"
              id="startTimeInput"
              ref={startTimeInputElement}
            />
          </div>
          <div className={styles.input_div}>
            <label htmlFor="endTimeInput">End time</label>
            <input
              type="datetime-local"
              id="endTimeInput"
              ref={endTimeInputElement}
            />
          </div>
        </div>
        <div className={styles.button_div}>
          <Button title="Save" />
        </div>
      </form>
    </div>
  );
}