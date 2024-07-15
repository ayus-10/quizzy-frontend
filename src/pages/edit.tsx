import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "../styles/edit.module.css";
import { useEffect, useState } from "react";
import getQuizQuestions from "../utils/get-quiz-questions";
import { QuizQuestion } from "../interfaces/quiz-question.interface";
import QuestionInput from "../components/question-input";
import Button from "../components/button";
import { BeatLoader } from "react-spinners";
import { v4 as uuid } from "uuid";

interface QuizQuestionWithId extends QuizQuestion {
  id: string;
}

export default function Edit() {
  const [credentials] = useSearchParams();

  const [quizQuestions, setQuizQuestions] = useState<QuizQuestionWithId[]>([]);

  const [loading, _setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchQuestions() {
      const id = String(credentials.get("id"));
      const password = String(credentials.get("pwd"));
      try {
        const questions = await getQuizQuestions(id, password);
        const questionsWithIds: QuizQuestionWithId[] = questions.map((q) => ({
          ...q,
          id: uuid(),
        }));
        setQuizQuestions(questionsWithIds);
      } catch (err) {
        navigate("/admin");
      }
    }

    fetchQuestions();
  }, [credentials]);

  function removeQuestion(idToBeRemoved: string) {
    setQuizQuestions((prev) => {
      return prev.filter((q) => q.id !== idToBeRemoved);
    });
  }

  function addQuestion() {
    const emptyQuestion: QuizQuestionWithId = {
      id: uuid(),
      question: "",
      answerChoices: [],
      correctChoice: 0,
    };

    setQuizQuestions((prev) => [...prev, emptyQuestion]);
  }

  return (
    <div className={styles.container}>
      <div className={styles.question_container}>
        {quizQuestions.map((q, index) => (
          <QuestionInput
            key={q.id}
            questionId={q.id}
            questionNumber={index + 1}
            removeQuestion={removeQuestion}
            previousQuestion={q.question}
            previousAnswerChoices={q.answerChoices}
            previousCorrectChoice={q.correctChoice}
          />
        ))}
      </div>
      <div className={`${styles.options} ${styles.options_div}`}>
        <Button title="Add question" action={addQuestion} />
        <div className={styles.options}>
          <Button
            title="Cancel"
            secondaryColor
            action={() => navigate("/admin/manage")}
          />
          <Button title="Submit" submitForm>
            {loading ? <BeatLoader color="#fff" /> : undefined}
          </Button>
        </div>
      </div>
    </div>
  );
}
