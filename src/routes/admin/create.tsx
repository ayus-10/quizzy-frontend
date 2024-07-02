import { FormEvent } from "react";
import Button from "../../components/button";
import styles from "../../styles/create.module.css";
import QuestionInput from "../../components/question-input";

export default function Create() {
  function handleInfoForm(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <div className={styles.container}>
      <form className={styles.info_form} onSubmit={(e) => handleInfoForm(e)}>
        <h1 className={styles.title}>Create a test</h1>
        <div className={styles.input_div}>
          <label htmlFor="titleInput">Title</label>
          <input type="text" id="titleInput" />
        </div>
        <div className={styles.date_input_div}>
          <div className={styles.input_div}>
            <label htmlFor="startTimeInput">Start time</label>
            <input type="datetime-local" id="startTimeInput" />
          </div>
          <div className={styles.input_div}>
            <label htmlFor="endTimeInput">End time</label>
            <input type="datetime-local" id="endTimeInput" />
          </div>
        </div>
        <div className={styles.button_div}>
          <Button title="Save" />
        </div>
      </form>
    </div>
  );
}
