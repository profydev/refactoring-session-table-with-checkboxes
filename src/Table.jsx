import { useMemo, useState, useRef } from "react";
import classes from "./Table.module.css";

function Table({ issues }) {
  const topCheckbox = useRef();
  const [checkedById, setCheckedById] = useState(new Set());

  const openIssues = useMemo(
    () => issues.filter(({ status }) => status === "open"),
    [issues]
  );
  const numOpenIssues = openIssues.length;
  const numCheckedIssues = checkedById.size;

  const handleOnChange = (id) => {
    const updatedCheckedById = new Set(checkedById);
    if (updatedCheckedById.has(id)) {
      updatedCheckedById.delete(id);
    } else {
      updatedCheckedById.add(id);
    }
    setCheckedById(updatedCheckedById);

    const updatedNumChecked = updatedCheckedById.size;
    topCheckbox.current.indeterminate =
      updatedNumChecked > 0 && updatedNumChecked < numOpenIssues;
  };

  const handleSelectDeselectAll = (event) => {
    if (event.target.checked) {
      const allChecked = new Set(openIssues.map(({ id }) => id));
      setCheckedById(allChecked);
    } else {
      setCheckedById(new Set());
    }
  };

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              ref={topCheckbox}
              className={classes.checkbox}
              checked={numOpenIssues === numCheckedIssues}
              onChange={handleSelectDeselectAll}
            />
          </th>
          <th className={classes.numChecked}>
            {numCheckedIssues
              ? `Selected ${numCheckedIssues}`
              : "None selected"}
          </th>
        </tr>
        <tr>
          <th />
          <th>Name</th>
          <th>Message</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {issues.map(({ id, name, message, status }) => {
          const isIssueOpen = status === "open";
          return (
            <tr
              key={id}
              className={
                isIssueOpen ? classes.openIssue : classes.resolvedIssue
              }
              style={{ backgroundColor: checkedById.has(id) ? "#eee" : "#fff" }}
            >
              <td>
                <input
                  type="checkbox"
                  className={classes.checkbox}
                  checked={checkedById.has(id)}
                  disabled={!isIssueOpen}
                  onChange={() => handleOnChange(id)}
                />
              </td>
              <td>{name}</td>
              <td>{message}</td>
              <td>
                <span
                  className={
                    isIssueOpen ? classes.greenCircle : classes.redCircle
                  }
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
