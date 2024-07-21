import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import axios from "axios";
import Admin from "./pages/admin";
import Create from "./pages/create";
import Manage from "./pages/manage";
import Result from "./pages/result";
import AlertMessage from "./components/alert-message";
import Edit from "./pages/edit";
import Join from "./pages/join";

export default function App() {
  axios.defaults.withCredentials = true;

  return (
    <>
      <AlertMessage />
      <Routes>
        <Route Component={Home} path="/" />
        <Route Component={Login} path="/login" />
        <Route Component={Register} path="/register" />
        <Route Component={Join} path="/join" />
        <Route Component={Admin} path="/admin">
          <Route element={<Navigate to="create" />} path="" />
          <Route Component={Create} path="create" />
          <Route Component={Manage} path="manage" />
          <Route Component={Result} path="result" />
          <Route Component={Edit} path="edit" />
        </Route>
      </Routes>
    </>
  );
}
