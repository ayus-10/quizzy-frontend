import { useEffect, useState } from "react";
import styles from "../styles/nav.module.css";
import Button from "./button";
import { useLocation, useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();

  const location = useLocation();

  const [showAltLinks, setShowAltLinks] = useState(false);

  useEffect(() => {
    if (
      location.pathname === "/join" ||
      location.pathname.includes("/result/")
    ) {
      setShowAltLinks(true);
    }
  }, [location]);

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Button action={() => navigate("/")} title="Quizzy" largeFont />
      </div>
      <div className={styles.buttons}>
        {showAltLinks ? (
          <>
            <Button action={() => navigate("/")} title="Home" />
            <Button action={() => navigate(-1)} title="Back" />
          </>
        ) : (
          <>
            <Button action={() => navigate("/join")} title="Join" />
            <Button action={() => navigate("/admin")} title="Admin" />
          </>
        )}
      </div>
    </nav>
  );
}
