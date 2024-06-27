import { Dispatch, FormEvent, SetStateAction, useRef } from "react";
import Button from "./button";
import styles from "../styles/auth-form.module.css";
import { Link } from "react-router-dom";

type FormAction = "login" | "register";

type AuthFormProps = {
  action: FormAction;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
};

export default function AuthForm(props: AuthFormProps) {
  const { action, setEmail, setPassword } = props;

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
    <div className={styles.container}>
      <div className={styles.title}>
        <WelcomeText formType={action} />
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <div className={styles.input_div}>
          <label htmlFor="email">Email</label>
          <input
            ref={emailInput}
            type="email"
            placeholder="Your email"
            id="email"
            className={styles.input}
          />
        </div>
        <div className={styles.input_div}>
          <label htmlFor="password">Password</label>
          <input
            ref={passwordInput}
            type="password"
            placeholder="Password"
            id="password"
            className={styles.input}
          />
        </div>
        <Button title={action} />
      </form>
      <div className={styles.bottom_text}>
        <BottomText formType={action} />
      </div>
    </div>
  );
}

function WelcomeText({ formType }: { formType: FormAction }) {
  return formType === "register" ? (
    <span>
      Welcome to Quizzy!🎉 <br />
      Please register as an Admin.
    </span>
  ) : (
    <span>
      Welcome back Admin!👋 <br />
      Please log in to your account.
    </span>
  );
}

function BottomText({ formType }: { formType: FormAction }) {
  return formType === "register" ? (
    <span>
      Already have an account? <Link to="/login">Login</Link>
    </span>
  ) : (
    <span>
      Don&apos;t have an account? <Link to="/register">Register</Link>
    </span>
  );
}
