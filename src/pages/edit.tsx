import { useNavigate } from "react-router-dom";
import styles from "../styles/edit.module.css";
import { FormEvent, useEffect, useRef, useState } from "react";
import getQuizQuestions from "../utils/get-quiz-questions";
import { QuizQuestion } from "../interfaces/quiz-question.interface";
import QuestionInput from "../components/question-input";
import Button from "../components/button";
import { BeatLoader, HashLoader } from "react-spinners";
import { v4 as uuid } from "uuid";
import { serializeQuizQuestions } from "../utils/serialize-quiz-questions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setQuizCredentials } from "../redux/slices/quiz-credentials.slice";
import { CiWarning } from "react-icons/ci";
import updateQuizQuestions from "../utils/update-quiz-questions";
import { setAlertMessage } from "../redux/slices/alert-message.slice";
import axios from "axios";

interface QuizQuestionWithId extends QuizQuestion {
  id: string;
}

export default function Edit() {
  const credentials = useAppSelector((state) => state.quizCredentials);

  const [fetchedQuizQuestions, setFetchedQuizQuestions] = useState<
    QuizQuestionWithId[]
  >([]);

  const [loading, setLoading] = useState(false);

  const questionsForm = useRef<HTMLFormElement>(null);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchQuestions() {
      const id = credentials.id;
      try {
        const res = await getQuizQuestions(id);

        const questions = res?.data.quiz as QuizQuestion[];

        // Adding the ID property as the fetched quiz questions are not going to have it
        const questionsWithIds: QuizQuestionWithId[] = questions.map((q) => ({
          ...q,
          id: uuid(),
        }));
        setFetchedQuizQuestions(questionsWithIds);
      } catch (err) {
        navigate("/admin");
      } finally {
        setLoading(false);
      }
    }

    setLoading(true);

    fetchQuestions();
  }, [credentials]);

  function removeQuestion(idToBeRemoved: string) {
    if (fetchedQuizQuestions.length <= 2) {
      return;
    }
    setFetchedQuizQuestions((prev) => {
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

    setFetchedQuizQuestions((prev) => [...prev, emptyQuestion]);
  }

  function cancelEdit() {
    dispatch(setQuizCredentials({ id: "" }));
    navigate("/admin");
  }

  async function handleFormSubmit(e: FormEvent) {
    setLoading(true);

    e.preventDefault();

    const questionInputs = (
      questionsForm.current?.querySelector("#allQuestions") as Element
    ).children;

    const quizQuestions: QuizQuestion[] =
      serializeQuizQuestions(questionInputs);

    try {
      const res = await updateQuizQuestions(credentials.id, quizQuestions);
      dispatch(setAlertMessage({ message: res?.data, status: "success" }));
      cancelEdit();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        dispatch(
          setAlertMessage({ message: err.response?.data, status: "error" })
        );
      }
    } finally {
      setLoading(false);
    }
  }

  if (fetchedQuizQuestions.length > 0)
    return (
      <form
        className={styles.container}
        ref={questionsForm}
        onSubmit={handleFormSubmit}
      >
        <div className={styles.questions} id="allQuestions">
          {fetchedQuizQuestions.map((q, index) => (
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
            <Button title="Cancel" secondaryColor action={cancelEdit} />
            <Button title="Submit" submitForm>
              {loading ? <BeatLoader color="#fff" /> : undefined}
            </Button>
          </div>
        </div>
      </form>
    );
  else {
    return (
      <div className={styles.error}>
        {loading ? (
          <HashLoader size={60} color="#f43f5e" />
        ) : (
          <CiWarning size={100} color="#f43f5e" />
        )}
        <p>
          {loading
            ? "Loading quiz data, please wait"
            : "Please delete the quiz if it's empty"}
        </p>
      </div>
    );
  }
}
