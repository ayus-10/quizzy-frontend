import { useEffect, useState } from "react";
import JoinForm from "../components/join-form";
import Nav from "../components/nav";
import { useAppSelector } from "../redux/hooks";

export type JoinStage = "initial" | "final";

export default function Join() {
  // In the "initial" stage, user will fill up quiz id, full-name and password for the quiz,
  // which will be sent to server and this state will be set to "final"
  const [joinStage, setJoinStage] = useState<JoinStage>("initial");

  const quizQuestions = useAppSelector((state) => state.quizQuestions);

  useEffect(() => console.log(quizQuestions), [joinStage]); // TEMP

  return (
    <>
      <Nav />
      <JoinForm setStage={setJoinStage} />
    </>
  );
}
