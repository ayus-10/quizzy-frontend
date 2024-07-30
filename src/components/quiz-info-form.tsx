import { FormEvent, SetStateAction, useRef, Dispatch, useEffect } from "react";
import saveQuizInfo from "../utils/save-quiz-info";
import { AxiosError } from "axios";
import Button from "./button";
import styles from "../styles/quiz-info-form.module.css";
import { CreationStage } from "../pages/create";
import { useAppDispatch } from "../redux/hooks";
import { setAlertMessage } from "../redux/slices/alert-message.slice";
import getUTCTimeStamp from "../utils/get-utc-time";

type QuizInfoFormProps = {
  setStage: Dispatch<SetStateAction<CreationStage>>;
};

export default function QuizInfoForm(props: QuizInfoFormProps) {
  const { setStage } = props;

  const dispatch = useAppDispatch();

  const titleInputElement = useRef<HTMLInputElement>(null);
  const startTimeInputElement = useRef<HTMLInputElement>(null);
  const endTimeInputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // On initial page load, check if quiz info was previously submitted
    // and set the creation stage to "final" if so
    const quizToken = localStorage.getItem("QUIZ_INFO");
    if (quizToken) {
      setStage("final");
    }
  }, []);

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

    saveQuizInfo(quizInfo)
      .then((res) => {
        dispatch(
          setAlertMessage({
            message: "Please continue creating your quiz",
            status: "success",
          })
        );
        // After saving quiz token to local storage, the creation stage will be advanced
        // to "final" so that users can create questions for the quiz
        const quizToken = res?.data.quizToken as string;
        localStorage.setItem("QUIZ_INFO", JSON.stringify({ quizToken, title }));
        setStage("final");
      })
      .catch((err: AxiosError) =>
        dispatch(
          setAlertMessage({
            message: err.response?.data as string,
            status: "error",
          })
        )
      );
  }

  return (
    <div className={styles.question_info_form}>
      <form className={styles.info_form} onSubmit={(e) => handleForm(e)}>
        <h1 className={styles.title}>Create a quiz</h1>
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
          <Button title="Save" submitForm />
        </div>
      </form>
    </div>
  );
}
