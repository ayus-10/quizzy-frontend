import styles from "../styles/button.module.css";

type ButtonProps = {
  action?: () => void;
  title: string;
  largeFont?: boolean;
  secondaryColor?: boolean;
};

export default function Button(props: ButtonProps) {
  const { action, title, largeFont, secondaryColor } = props;

  return (
    <button
      onClick={action}
      className={`${styles.button} ${largeFont && styles.large_font} ${
        secondaryColor ? styles.secondary : styles.primary
      }`}
    >
      {title}
    </button>
  );
}
