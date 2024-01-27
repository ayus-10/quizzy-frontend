import { Link } from "react-router-dom";
import Button from "../components/Button";
import styles from "../styles/QuizInfo.module.css";

function QuizInfo() {
  const quizInfo = localStorage.getItem("QUIZ_INFO");

  let id: string | null = null;
  let password: string | null = null;

  if (quizInfo === null) {
    window.location.href = "/create";
  } else {
    id = JSON.parse(quizInfo).id;
    password = JSON.parse(quizInfo).password;
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Here's the ID and Password for your most recently created quiz.</h2>
        <div className={styles.text_parent}>
          <div className={styles.text}>
            <p>ID:</p>
            <span>{id}</span>
          </div>
          <div className={styles.text}>
            <p>Password:</p>
            <span>{password}</span>
          </div>
        </div>
      </div>
      <Link to={"/"}>
        <Button text="Back to home" />
      </Link>
    </div>
  );
}

export default QuizInfo;
