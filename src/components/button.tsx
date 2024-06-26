import styles from "../styles/button.module.css";

type ButtonProps = {
  action: () => void;
  title: string;
  largeFont?: boolean;
};

export default function Button(props: ButtonProps) {
  const { action, title, largeFont } = props;

  return (
    <button
      onClick={action}
      className={styles.button}
      style={
        largeFont ? { fontSize: "22px", fontWeight: 600 } : { fontSize: "18px" }
      }
    >
      {title}
    </button>
  );
}
