import { Fragment, useEffect, useState } from "react";
import getResults from "../utils/get-results";
import { getQuizIdFromUrl } from "../utils/get-quiz-id-from-url";
import styles from "../styles/results.module.css";
import commonStyles from "../styles/common-styles.module.css";
import { v4 as uuid } from "uuid";

interface Result {
  submittedBy: string;
  totalQuestions: number;
  correctQuestions: number;
}

export default function Results() {
  const [results, setResults] = useState<Result[]>([]);

  const [filteredResults, setFilteredResults] = useState<Result[]>([]);

  const [quizId] = useState(() => getQuizIdFromUrl());

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search) {
      setFilteredResults(results.filter((r) => r.submittedBy.includes(search)));
    } else {
      setFilteredResults(results);
    }
  }, [results, search]);

  useEffect(() => {
    getResults(quizId)
      .then((res) => setResults(res?.data.results))
      .finally(() => setLoading(false));
  }, [quizId]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Results</h1>
      <input
        type="text"
        className={commonStyles.search_input}
        placeholder="Search by name..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className={commonStyles.grid_wrapper}>
        <div
          className={`${commonStyles.grid_body} ${commonStyles.three_columns}`}
        >
          <div className={commonStyles.heading_cell}>S.N.</div>
          <div className={commonStyles.heading_cell}>Submitted By</div>
          <div className={commonStyles.heading_cell}>Score</div>
          {filteredResults.map((r, index) => (
            <Fragment key={uuid()}>
              <div className={commonStyles.cell}>{index + 1}</div>
              <div className={commonStyles.cell}>{r.submittedBy}</div>
              <div className={commonStyles.cell}>
                {r.correctQuestions}/{r.totalQuestions}
              </div>
            </Fragment>
          ))}
        </div>
        {loading ? (
          <p>Loading, please wait.</p>
        ) : results.length === 0 ? (
          <p>No data found.</p>
        ) : null}
      </div>
    </div>
  );
}
