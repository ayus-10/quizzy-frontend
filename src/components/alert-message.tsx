import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import styles from "../styles/alert-message.module.css";
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
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

  function alertIcon() {
    switch (status) {
      case "success":
        return <IoCheckmarkCircleOutline />;
      case "error":
        return <IoCloseCircleOutline />;
      case "warning":
        return <HiOutlineExclamationCircle />;
    }
  }

  if (message && status)
    return (
      <div
        className={`${styles.alert_message} ${
          status === "success"
            ? styles.success
            : status === "error"
            ? styles.error
            : styles.warning
        }`}
      >
        <div className={styles.icon}>{alertIcon()}</div>
        <p>{message}</p>
      </div>
    );
}
