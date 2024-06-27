import { useEffect, useState } from "react";
import AuthForm from "../components/auth-form";
import Nav from "../components/nav";
import { BASE_API_URL } from "../config";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  axios.defaults.withCredentials = true;

  const apiUrl = BASE_API_URL + "/users/login";

  const navigate = useNavigate();

  useEffect(() => {
    if (!loginEmail || !loginPassword) {
      return;
    }

    const userData = { email: loginEmail, password: loginPassword };

    axios
      .post(apiUrl, userData)
      .then((res) => {
        alert(res.data);
        navigate("/admin");
      })
      .catch((err: AxiosError) => alert(err.response?.data ?? err.message));
  }, [loginEmail, loginPassword]);

  return (
    <>
      <Nav />
      <AuthForm
        action="login"
        setEmail={setLoginEmail}
        setPassword={setLoginPassword}
      />
    </>
  );
}
