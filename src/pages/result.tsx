import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/nav";
import styles from "../styles/result.module.css";
import { MdCheck, MdClose } from "react-icons/md";
import { BASE_API_URL } from "../config";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa";
import { HashLoader } from "react-spinners";
import { QuizSubmission } from "../interfaces/quiz-submission.interface";

interface QuizResult {
  questionId: string;
  selectedAnswerNumber: number;
  correctAnswerNumber: number;
  questionText: string;
  selectedAnswerText: string;
  correctAnswerText: string;
}

export default function Result() {
  const { id } = useParams();

  const [results, setResults] = useState<QuizResult[]>([]);

  const [showDetails, setShowDetails] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getResult() {
      const resultDataString = localStorage.getItem("RESULT_DATA");
      const resultData = resultDataString
        ? (JSON.parse(resultDataString) as QuizSubmission[])
        : [];

      const currentResultData = resultData.find((rd) => rd.quizId === id);
      const fullname = currentResultData?.submittedBy;

      const apiUrl = `${BASE_API_URL}/join/result?id=${id}&fullname=${fullname}`;
      const { data } = await axios.get(apiUrl);
      setResults(data.results);

      setLoading(false);
    }
    getResult();
  }, [id]);

  const getTotalCount = () => results.length;

  const getCorrectCount = () =>
    results.filter((r) => r.correctAnswerNumber === r.selectedAnswerNumber)
      .length;

  const getUnattemptedCount = () =>
    results.filter((r) => r.selectedAnswerNumber === 0).length;

  const getIncorrectCount = () =>
    getTotalCount() - getCorrectCount() - getUnattemptedCount();

  if (results)
    return (
      <>
        <div className={styles.nav_div}>
          <Nav />
        </div>
        {loading ? (
          <div className={styles.loader}>
            <HashLoader color="#f43f5e" size={60} />
            <p>Please wait</p>
          </div>
        ) : (
          <div className={styles.container}>
            {results.length > 0 ? (
              <>
                <div className={styles.questions}>
                  {results.map((r, index) => (
                    <div className={styles.question} key={r.questionId}>
                      <div className={styles.question_div}>
                        <div className={styles.question_title}>
                          <div
                            className={`${styles.icon} ${
                              r.selectedAnswerNumber === r.correctAnswerNumber
                                ? styles.icon_correct
                                : styles.icon_incorrect
                            }`}
                          >
                            {r.correctAnswerNumber ===
                            r.selectedAnswerNumber ? (
                              <MdCheck />
                            ) : (
                              <MdClose />
                            )}
                          </div>
                          <p className={styles.bold}>Q.No.: {index + 1}</p>
                        </div>
                        <div className={styles.question_text}>
                          <span className={styles.bold}>Question: </span>
                          <p>{r.questionText}</p>
                        </div>
                      </div>
                      <div className={styles.answer_div}>
                        <span className={styles.bold}>Chosen: </span>
                        <p>
                          {r.selectedAnswerNumber === 0
                            ? "None"
                            : r.selectedAnswerText}
                        </p>
                      </div>
                      <div className={styles.answer_div}>
                        <span className={styles.bold}>Correct: </span>
                        <p>{r.correctAnswerText}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className={`${styles.details} ${
                    showDetails && styles.details_visible
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setShowDetails((prev) => !prev)}
                    className={`${styles.toggle_details} ${
                      showDetails && styles.toggled
                    }`}
                  >
                    <FaChevronDown />
                  </button>
                  <h2>Summary:</h2>
                  <div className={styles.summary}>
                    <span>Questions: {getTotalCount()}</span>
                    <span>Correct: {getCorrectCount()}</span>
                    <span>Incorrect: {getIncorrectCount()}</span>
                    <span>Unattempted: {getUnattemptedCount()}</span>
                  </div>
                  <h2>Questions:</h2>
                  <div className={styles.results}>
                    {results.map((r, index) => (
                      <div
                        key={`result_icon_${index}`}
                        className={`${styles.question_result} ${
                          r.correctAnswerNumber === r.selectedAnswerNumber
                            ? styles.question_result_correct
                            : styles.question_result_incorrect
                        }`}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <p className={styles.error}>Unable to load the result!</p>
            )}
          </div>
        )}
      </>
    );
}
