import styles from "../styles/Home.module.css";
import Button from "../components/Button";
import MyLink from "../components/MyLink";
import { Link } from "react-router-dom";
import { useState } from "react";

type activeTabType = "take" | "create";

type tabContentType = {
  title: string;
  state: activeTabType;
  steps: string[];
  button: {
    name: "Result" | "Info";
    link: "/result" | "/info";
  };
};

function Home() {
  const [activeTab, setActiveTab] = useState<activeTabType>("take");

  function changeActiveTab(state: activeTabType) {
    setActiveTab(state);
  }

  const tabContents: tabContentType[] = [
    {
      title: "Taking a quiz",
      state: "take",
      steps: [
        "Click on the Take Quiz button below.",
        "Fill up the quiz details.",
        "Click on the link below to view all taken quiz result.",
      ],
      button: {
        name: "Result",
        link: "/result",
      },
    },
    {
      title: "Creating a quiz",
      state: "create",
      steps: [
        "Click on the Create Quiz button below.",
        "Add the questions and answers.",
        "Click on the link below to view all created quiz info.",
      ],
      button: {
        name: "Info",
        link: "/info",
      },
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Quizzy!</h1>
      <div className={styles.description}>
        <div className={styles.tabs}>
          {tabContents.map((item) => (
            <span
              key={item.state}
              className={styles.tab}
              onClick={() => changeActiveTab(item.state)}
            >
              <h3 className={styles.tab_title}>{item.title}</h3>
              <div
                className={styles.underline}
                style={{
                  backgroundColor:
                    activeTab === item.state
                      ? "var(--red-1)"
                      : "var(--gray-dark)",
                }}
              ></div>
            </span>
          ))}
        </div>
        <ul className={styles.steps}>
          {tabContents.map((item) => {
            return item.state === activeTab
              ? item.steps.map((step, index) => (
                  <li className={styles.step} key={index}>
                    {step}
                  </li>
                ))
              : null;
          })}
        </ul>
        <div className={styles.button_parent}>
          {tabContents.map((item, index) => {
            return item.state === activeTab ? (
              <MyLink
                path={item.button.link}
                name={item.button.name}
                key={index}
              ></MyLink>
            ) : null;
          })}
        </div>
      </div>
      <div className={styles.button_parent}>
        <Link to={"/quiz"}>
          <Button text="Take quiz" />
        </Link>
        <Link to={"/create"}>
          <Button text="Create quiz" />
        </Link>
      </div>
    </div>
  );
}

export default Home;
