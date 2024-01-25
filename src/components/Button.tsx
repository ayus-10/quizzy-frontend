import styles from "../styles/Button.module.css";

function Button({ text }: { text: string }) {
  return (
    <div className={styles.button_parent}>
      <button className={styles.button}>{text}</button>
    </div>
  );
}

export default Button;
