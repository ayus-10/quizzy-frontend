import { useEffect, useState, Fragment } from "react";
import getAllQuizInfo from "../utils/get-all-quiz-info";
import styles from "../styles/manage.module.css";
import commonStyles from "../styles/common-styles.module.css";
import { FetchedQuizInfo } from "../interfaces/fetched-quiz-info.interface";
import { TbEditCircle } from "react-icons/tb";
import { HiOutlineTrash } from "react-icons/hi2";
import { useAppDispatch } from "../redux/hooks";
import { setAlertMessage } from "../redux/slices/alert-message.slice";
import { useNavigate } from "react-router-dom";
import deleteQuiz from "../utils/delete-quiz";
import { GoChecklist } from "react-icons/go";

export default function Manage() {
  const [allQuizInfo, setAllQuizInfo] = useState<FetchedQuizInfo[]>([]);

  const [filteredQuizInfo, setFilteredQuizInfo] = useState<FetchedQuizInfo[]>(
    []
  );

  const [search, setSearch] = useState(""); // Used to filter the quizzes by title

  // On clicking "delete" button, the corresponding quiz id will be saved to this state,
  // and only after clicking the "delete" button again for same quiz it will be deleted
  const [quizIdToBeDeleted, setQuizIdToBeDeleted] = useState("");

  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllQuizInfo() {
      const res = await getAllQuizInfo();
      setAllQuizInfo(res?.data.infos);
      setFilteredQuizInfo(res?.data.infos);
      setLoading(false);
    }

    setLoading(true);

    fetchAllQuizInfo();
  }, []);

  useEffect(() => {
    setFilteredQuizInfo(() => {
      return allQuizInfo.filter((info) => info.title.includes(search));
    });
  }, [search]);

  async function handleQuizDeletion(id: string) {
    if (id !== quizIdToBeDeleted) {
      setQuizIdToBeDeleted(id);
      dispatch(
        setAlertMessage({
          message: "Click on delete again to confirm",
          status: "warning",
        })
      );
    } else {
      const res = await deleteQuiz(id);
      dispatch(setAlertMessage({ message: res?.data, status: "success" }));
      navigate("/admin/create");
    }
  }

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

  function navigateToEdit(id: string) {
    navigate(`/admin/edit?id=${id}`);
  }

  function navigateToResult(id: string) {
    navigate(`/admin/results?id=${id}`);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Quizzes</h1>
      <input
        type="text"
        className={commonStyles.search_input}
        placeholder="Search by title..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className={commonStyles.grid_wrapper}>
        <div
          className={`${commonStyles.grid_body} ${commonStyles.eight_columns}`}
        >
          <div className={commonStyles.heading_cell}>S.N.</div>
          <div className={commonStyles.heading_cell}>Title</div>
          <div className={commonStyles.heading_cell}>ID</div>
          <div className={commonStyles.heading_cell}>Password</div>
          <div className={commonStyles.heading_cell}>Starts</div>
          <div className={commonStyles.heading_cell}>Ends</div>
          <div className={commonStyles.heading_cell}>Duration</div>
          <div className={commonStyles.heading_cell}>Action</div>
          {filteredQuizInfo.map((info, index) => (
            <Fragment key={info.id}>
              <div className={commonStyles.cell}>{index + 1}</div>
              <div className={commonStyles.cell}>{info.title}</div>
              <div className={commonStyles.cell}>{info.id}</div>
              <div className={commonStyles.cell}>{info.password}</div>
              <div className={commonStyles.cell}>
                {formattedTime(info.startTime)}
              </div>
              <div className={commonStyles.cell}>
                {formattedTime(info.endTime)}
              </div>
              <div className={commonStyles.cell}>
                {durationBetween(info.startTime, info.endTime)}
              </div>
              <div className={commonStyles.cell}>
                <button
                  className={commonStyles.action_button}
                  onClick={() => navigateToEdit(info.id)}
                >
                  <TbEditCircle />
                  <span>Edit</span>
                </button>
                <button
                  className={commonStyles.action_button}
                  onClick={() => handleQuizDeletion(info.id)}
                >
                  <HiOutlineTrash />
                  <span>Delete</span>
                </button>
                <button
                  className={commonStyles.action_button}
                  onClick={() => navigateToResult(info.id)}
                >
                  <GoChecklist />
                  <span>Result</span>
                </button>
              </div>
            </Fragment>
          ))}
        </div>
        {filteredQuizInfo.length == 0 && (
          <p> {loading ? "Loading, please wait." : "No data found."}</p>
        )}
      </div>
    </div>
  );
}
