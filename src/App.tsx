import { Routes, Route } from "react-router-dom";
import Quiz from "./routes/Quiz";
import Home from "./routes/Home";
import styles from "./styles/App.module.css";
import Create from "./routes/Create";

function App() {
  return (
    <div className={styles.wrapper}>
      <Routes>
        <Route element={<Home />} path={"/"} />
        <Route element={<Quiz />} path={"/quiz"} />
        <Route element={<Create />} path={"/create"} />
      </Routes>
    </div>
  );
}

export default App;
