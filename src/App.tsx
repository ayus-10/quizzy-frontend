import { Routes, Route } from "react-router-dom";
import Quiz from "./routes/Quiz";
import Home from "./routes/Home";
import styles from "./styles/App.module.css";
import Create from "./routes/Create";
import QuizInfo from "./routes/QuizInfo";

function App() {
  return (
    <div className={styles.wrapper}>
      <Routes>
        <Route element={<Home />} path={"/"} />
        <Route element={<Quiz />} path={"/quiz"} />
        <Route element={<Create />} path={"/create"} />
        <Route element={<QuizInfo />} path={"/info"} />
      </Routes>
    </div>
  );
}

export default App;
