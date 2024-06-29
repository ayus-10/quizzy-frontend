import { Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import Login from "./routes/login";
import Register from "./routes/register";
import axios from "axios";
import Admin from "./routes/admin";

export default function App() {
  axios.defaults.withCredentials = true;

  return (
    <Routes>
      <Route Component={Home} path="/" />
      <Route Component={Login} path="/login" />
      <Route Component={Register} path="/register" />
      <Route Component={Admin} path="/admin" />
    </Routes>
  );
}
