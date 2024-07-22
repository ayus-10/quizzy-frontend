import { useEffect, useState } from "react";
import styles from "../styles/countdown.module.css";
import getUTCTimeStamp from "../utils/get-utc-time";

export default function CountDown({ time }: { time: number }) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const currentTime = getUTCTimeStamp(undefined);

    const duration = (time - currentTime) / 1000;

    const intervalId = setInterval(() => {
      const h = Math.floor((duration % (60 * 60 * 24)) / (60 * 60));
      const m = Math.floor((duration % (60 * 60)) / 60);
      const s = Math.floor(duration % 60);
      setHours(h > 0 ? h : 0);
      setMinutes(m > 0 ? m : 0);
      setSeconds(s > 0 ? s : 0);
    }, 1000);

    return () => clearInterval(intervalId);
  });

  function zeroPrefix(n: number) {
    return n >= 10 ? n.toString() : "0" + n;
  }

  return (
    <div className={styles.countdown}>
      <span>
        {zeroPrefix(hours)}:{zeroPrefix(minutes)}:{zeroPrefix(seconds)}
      </span>
    </div>
  );
}
