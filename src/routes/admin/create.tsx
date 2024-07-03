import { FormEvent, useRef } from "react";
import Button from "../../components/button";
import styles from "../../styles/create.module.css";
import saveQuizInfo from "../../utils/save-quiz-info";

export default function Create() {
  const titleInputElement = useRef<HTMLInputElement>(null);
  const startTimeInputElement = useRef<HTMLInputElement>(null);
  const endTimeInputElement = useRef<HTMLInputElement>(null);

  function getUTCTimeStamp(date: string) {
    const utcDateString = new Date(date).toISOString();
    const timeStamp = new Date(utcDateString).getTime();
    return timeStamp;
  }

  async function handleInfoForm(e: FormEvent) {
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

    saveQuizInfo(quizInfo).then((res) => {
      alert(res);
    });
  }

  return (
    <div className={styles.container}>
      <form className={styles.info_form} onSubmit={(e) => handleInfoForm(e)}>
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
