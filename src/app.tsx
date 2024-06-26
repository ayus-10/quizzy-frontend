import { Routes, Route } from "react-router-dom";
import Home from "./routes/home";

export default function App() {
  return (
    <Routes>
      <Route Component={Home} path="/" />
    </Routes>
  );
}
