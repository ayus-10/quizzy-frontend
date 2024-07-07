import { GoGear } from "react-icons/go";
import Nav from "../components/nav";
import styles from "../styles/home.module.css";
import { IoFlash } from "react-icons/io5";
import { BiSolidStopwatch } from "react-icons/bi";
import { RiAdminLine } from "react-icons/ri";

export default function Home() {
  const features = [
    {
      text: "Custom Quizzes",
      icon: <GoGear />,
    },
    {
      text: "Instant Result",
      icon: <IoFlash />,
    },
    {
      text: "Scheduled Quizzes",
      icon: <BiSolidStopwatch />,
    },
    {
      text: "Admin Dashboard",
      icon: <RiAdminLine />,
    },
  ];

  return (
    <>
      <Nav />
      <main className={styles.container}>
        <div className={styles.box}>
          <h1 className={styles.title}>
            Welcome to <span>Quizzy</span>
          </h1>
          <p className={styles.description}>
            Create and share quizzes effortlessly with Quizzy. Perfect for
            educators, trainers, and anyone looking to engage others with
            interactive learning experiences.
          </p>
        </div>
        <div className={styles.box}>
          <h1 className={styles.title}>
            Why <span>Quizzy?</span>
          </h1>
          <div className={styles.grid}>
            {features.map((feature) => (
              <div className={styles.feature} key={feature.text}>
                <div className={styles.icon}>{feature.icon}</div>
                <span className={styles.text}>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
