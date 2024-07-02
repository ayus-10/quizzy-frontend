import { Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import Login from "./routes/login";
import Register from "./routes/register";
import axios from "axios";
import Admin from "./routes/admin";
import Create from "./routes/admin/create";
import Manage from "./routes/admin/manage";
import Result from "./routes/admin/result";

export default function App() {
  axios.defaults.withCredentials = true;

  return (
    <Routes>
      <Route Component={Home} path="/" />
      <Route Component={Login} path="/login" />
      <Route Component={Register} path="/register" />
      <Route Component={Admin} path="/admin">
        <Route Component={Create} path="create" index />
        <Route Component={Manage} path="manage" />
        <Route Component={Result} path="result" />
      </Route>
    </Routes>
  );
}
