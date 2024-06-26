import { Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import Login from "./routes/login";
import Register from "./routes/register";

export default function App() {
  return (
    <Routes>
      <Route Component={Home} path="/" />
      <Route Component={Login} path="/login" />
      <Route Component={Register} path="/register" />
    </Routes>
  );
}
