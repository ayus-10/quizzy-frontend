import { useEffect, useState } from "react";
import AuthForm from "../components/auth-form";
import Nav from "../components/nav";
import { BASE_API_URL } from "../config";
import axios from "axios";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const apiUrl = BASE_API_URL + "/users/login";

  useEffect(() => {
    if (!loginEmail || !loginPassword) {
      return;
    }

    const userData = { email: loginEmail, password: loginPassword };

    axios
      .post(apiUrl, userData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [loginEmail, loginPassword]);

  return (
    <>
      <Nav />
      <AuthForm
        type="login"
        setEmail={setLoginEmail}
        setPassword={setLoginPassword}
      />
    </>
  );
}
