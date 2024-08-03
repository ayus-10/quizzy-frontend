import { useEffect, useState } from "react";
import { QuizSubmission } from "../interfaces/quiz-submission.interface";
import { useParams } from "react-router-dom";

export default function Result() {
  const { id } = useParams();

  const [currentResult, setCurrentResult] = useState<QuizSubmission>();

  useEffect(() => {
    const resultsString = localStorage.getItem("RESULTS");
    if (!resultsString) {
      return;
    }
    const results = JSON.parse(resultsString) as QuizSubmission[];
    setCurrentResult(results.find((r) => r.quizId === id));
  }, [id]);

  return <div>{currentResult && JSON.stringify(currentResult)}</div>;
}
