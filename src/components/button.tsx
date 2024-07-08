import { ReactNode } from "react";
import styles from "../styles/button.module.css";

type ButtonProps = {
  action?: () => void;
  title: string;
  largeFont?: boolean;
  secondaryColor?: boolean;
  submitForm?: boolean;
  children?: ReactNode;
};

export default function Button(props: ButtonProps) {
  const { action, title, largeFont, secondaryColor, submitForm, children } =
    props;

  return (
    <button
      onClick={action}
      className={`${styles.button} ${largeFont && styles.large_font} ${
        secondaryColor ? styles.secondary : styles.primary
      }`}
      type={submitForm ? "submit" : "button"}
    >
      {children ? children : title}
    </button>
  );
}
