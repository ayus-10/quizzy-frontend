import { Routes, Route, Link } from "react-router-dom";
import Quiz from "./routes/Quiz";
import Home from "./routes/Home";
import styles from "./styles/App.module.css";

function App() {
  return (
    <div className={styles.wrapper}>
      <Routes>
        <Route element={<Home />} path={"/"} />
        <Route element={<Quiz />} path={"/quiz"} />
      </Routes>
    </div>
  );
}

export default App;
