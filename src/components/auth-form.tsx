import { Dispatch, FormEvent, SetStateAction, useRef } from "react";
import Button from "./button";
import styles from "../styles/auth-form.module.css";
import commonStyles from "../styles/common-styles.module.css";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

type FormAction = "login" | "register";

type AuthFormProps = {
  action: FormAction;
  loading: boolean;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
};

export default function AuthForm(props: AuthFormProps) {
  const { action, loading, setEmail, setPassword } = props;

  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const email = emailInput.current?.value;
    const password = passwordInput.current?.value;

    if (!email || !password) {
      return;
    }

    setEmail(email);
    setPassword(password);
  }

  return (
    <div className={styles.auth_form}>
      <div className={styles.title}>
        <WelcomeText formType={action} />
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <div className={commonStyles.input_div}>
          <label htmlFor="email">Email</label>
          <input
            ref={emailInput}
            type="email"
            placeholder="Your email"
            id="email"
            className={commonStyles.input}
          />
        </div>
        <div className={commonStyles.input_div}>
          <label htmlFor="password">Password</label>
          <input
            ref={passwordInput}
            type="password"
            placeholder="Password"
            id="password"
            className={commonStyles.input}
          />
        </div>
        <div className={commonStyles.center}>
          {loading ? (
            <BeatLoader color="#f43f5e" />
          ) : (
            <Button title={action} submitForm />
          )}
        </div>
      </form>
      <div className={commonStyles.center}>
        <BottomText formType={action} />
      </div>
    </div>
  );
}

function WelcomeText({ formType }: { formType: FormAction }) {
  switch (formType) {
    case "register":
      return (
        <span>
          Welcome to Quizzy!🎉 <br />
          Please register as an Admin.
        </span>
      );
    case "login":
      return (
        <span>
          Welcome back Admin!👋 <br />
          Please log in to your account.
        </span>
      );
  }
}

function BottomText({ formType }: { formType: FormAction }) {
  switch (formType) {
    case "register":
      return (
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      );
    case "login":
      return (
        <span>
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </span>
      );
  }
}
