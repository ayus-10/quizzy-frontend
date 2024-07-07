import { useEffect, useState } from "react";
import AuthForm from "../components/auth-form";
import Nav from "../components/nav";
import { BASE_API_URL } from "../config";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { setAlertMessage } from "../redux/slices/alert-message.slice";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = BASE_API_URL + "/users/login";

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loginEmail || !loginPassword) {
      return;
    }

    const userData = { email: loginEmail, password: loginPassword };

    setIsLoading(true);

    axios
      .post(apiUrl, userData)
      .then((res) => {
        dispatch(setAlertMessage({ message: res.data, status: "success" }));
        navigate("/admin");
      })
      .catch((err: AxiosError) =>
        dispatch(
          setAlertMessage({
            message: (err.response?.data as string) ?? err.message,
            status: "error",
          })
        )
      )
      .finally(() => setIsLoading(false));
  }, [loginEmail, loginPassword]);

  return (
    <>
      <Nav />
      <AuthForm
        action="login"
        loading={isLoading}
        setEmail={setLoginEmail}
        setPassword={setLoginPassword}
      />
    </>
  );
}
