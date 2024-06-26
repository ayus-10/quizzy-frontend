import styles from "../styles/nav.module.css";
import Button from "./button";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Button action={() => navigate("/")} title="Quizzy" largeFont />
      </div>
      <div className={styles.buttons}>
        <Button action={() => navigate("/join")} title="Join" />
        <Button action={() => navigate("/admin")} title="Admin" />
      </div>
    </nav>
  );
}
