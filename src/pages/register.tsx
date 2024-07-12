import { useEffect, useState } from "react";
import AuthForm from "../components/auth-form";
import Nav from "../components/nav";
import { BASE_API_URL } from "../config";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { setAlertMessage } from "../redux/slices/alert-message.slice";

export default function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = `${BASE_API_URL}/users/register`;

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!registerEmail || !registerPassword) {
      return;
    }

    const userData = { email: registerEmail, password: registerPassword };

    setIsLoading(true);

    axios
      .post(apiUrl, userData)
      .then((res) => {
        dispatch(setAlertMessage({ message: res.data, status: "success" }));
        navigate("/login");
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
  }, [registerEmail, registerPassword]);

  return (
    <>
      <Nav />
      <AuthForm
        action="register"
        loading={isLoading}
        setEmail={setRegisterEmail}
        setPassword={setRegisterPassword}
      />
    </>
  );
}
