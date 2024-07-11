import { useEffect, useState } from "react";
import getAllQuizInfo from "../../utils/get-all-quiz-info";
import styles from "../../styles/manage.module.css";
import { FetchedQuizInfo } from "../../interfaces/fetched-quiz-info.interface";
import { TbEditCircle } from "react-icons/tb";
import { HiOutlineTrash } from "react-icons/hi2";

export default function Manage() {
  const [allQuizInfo, setAllQuizInfo] = useState<FetchedQuizInfo[]>([]);

  const [filteredQuizInfo, setFilteredQuizInfo] = useState<FetchedQuizInfo[]>(
    []
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchAllQuizInfo() {
      const res = await getAllQuizInfo();
      setAllQuizInfo(res?.data.infos);
      setFilteredQuizInfo(res?.data.infos);
    }

    fetchAllQuizInfo();
  }, []);

  useEffect(() => {
    setFilteredQuizInfo(() => {
      return allQuizInfo.filter((info) => info.title.includes(search));
    });
  }, [search]);

  function formattedTime(timestamp: number) {
    const dateTime = new Date(timestamp);
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString();
    return `${time} (${date})`;
  }

  function durationBetween(timestamp1: number, timestamp2: number) {
    const difference = timestamp2 - timestamp1;
    const totalMinutes = Math.ceil(difference / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} hr, ${minutes} min`;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Quizzes</h1>
      <input
        type="text"
        className={styles.search_input}
        placeholder="Search by title..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className={styles.table_container}>
        <table className={styles.info_table}>
          <thead>
            <tr>
              <td>S.N.</td>
              <td>Title</td>
              <td>Starts</td>
              <td>Ends</td>
              <td>Duration</td>
              <td>ID</td>
              <td>Password</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {filteredQuizInfo.map((info, index) => (
              <tr key={info.id}>
                <td>{index + 1}</td>
                <td>{info.title}</td>
                <td>{formattedTime(info.startTime)}</td>
                <td>{formattedTime(info.endTime)}</td>
                <td>{durationBetween(info.startTime, info.endTime)}</td>
                <td>{info.id}</td>
                <td>{info.password}</td>
                <td>
                  <button className={styles.action_button}>
                    <TbEditCircle />
                    <span>Edit</span>
                  </button>
                  <button className={styles.action_button}>
                    <HiOutlineTrash />
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
