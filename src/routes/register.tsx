import { useEffect, useState } from "react";
import AuthForm from "../components/auth-form";
import Nav from "../components/nav";
import { BASE_API_URL } from "../config";
import axios from "axios";

export default function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const apiUrl = BASE_API_URL + "/users/register";

  useEffect(() => {
    if (!registerEmail || !registerPassword) {
      return;
    }

    const userData = { email: registerEmail, password: registerPassword };

    axios
      .post(apiUrl, userData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [registerEmail, registerPassword]);

  return (
    <>
      <Nav />
      <AuthForm
        type="register"
        setEmail={setRegisterEmail}
        setPassword={setRegisterPassword}
      />
    </>
  );
}
