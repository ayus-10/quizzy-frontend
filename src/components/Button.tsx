import styles from "../styles/Button.module.css";

type ButtonProps = { text: string; action?: () => void };

function Button(props: ButtonProps) {
  const { text, action } = props;
  return (
    <div className={styles.button_parent} onClick={action}>
      <button className={styles.button}>{text}</button>
    </div>
  );
}

export default Button;
