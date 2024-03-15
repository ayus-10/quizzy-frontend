import styles from "../styles/QuizInfo.module.css";
import MyLink from "../components/MyLink";
import type { ResponseDataType } from "../index.d.ts";

function QuizInfo() {
  const quizInfoString = localStorage.getItem("QUIZ_INFO");

  const quizInfo: ResponseDataType[] = quizInfoString
    ? JSON.parse(quizInfoString)
    : null;

  if (quizInfo === null) {
    window.location.href = "/";
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.info_title}>Created quizzes</h2>
      {!!quizInfo && (
        <div className={styles.table}>
          <div className={styles.table_head}>
            <p className={styles.text}>S.N.</p>
            <p className={styles.text}>ID</p>
            <p className={styles.text}>Password</p>
            <p className={styles.text}>Created</p>
          </div>
          <div className={styles.table_body}>
            {quizInfo.map((object, index) => (
              <>
                <div className={styles.row} key={index}>
                  <span className={styles.text}>{index + 1}</span>
                  <span className={styles.text}>{object.id}</span>
                  <span className={styles.text}>{object.password}</span>
                  <span className={styles.text}>{object.created}</span>
                </div>
                {!!(index < quizInfo.length - 1) && (
                  <div className={styles.separator}></div>
                )}
              </>
            ))}
          </div>
        </div>
      )}
      <MyLink path="/" name="Back to home" />
    </div>
  );
}

export default QuizInfo;
