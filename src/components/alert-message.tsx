import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import styles from "../styles/alert-message.module.css";
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import { setAlertMessage } from "../redux/slices/alert-message.slice";

export default function AlertMessage() {
  const { message, status } = useAppSelector((state) => state.alertMessage);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!message || !status) {
      return;
    }

    const time = status === "success" ? 3000 : 5000;

    const timeoutId = setTimeout(() => {
      dispatch(setAlertMessage({ message: null, status: null }));
    }, time);

    return () => clearTimeout(timeoutId);
  }, [message, status]);

  if (message && status)
    return (
      <div
        className={`${styles.alert_message} ${
          status === "success" ? styles.success : styles.error
        }`}
      >
        <div className={styles.icon}>
          {status === "success" ? (
            <IoCheckmarkCircleOutline />
          ) : (
            <IoCloseCircleOutline />
          )}
        </div>
        <p>{message}</p>
      </div>
    );
}
