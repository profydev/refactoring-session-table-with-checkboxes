import { useRef, useState, useMemo } from "react";
import classes from "./Table.module.css";

function mapOpenIssues(issues) {
  return issues.reduce((tmp, { id, status }) => {
    if (status !== "open") {
      return tmp;
    }
    return {
      ...tmp,
      [id]: true,
    };
  }, {});
}

function Table({ issues }) {
  const topCheckbox = useRef();
  const [idToChecked, setIdToChecked] = useState({});
  const idToIsOpen = useMemo(() => mapOpenIssues(issues), [issues]);

  const numChecked = Object.keys(idToChecked).length;
  const numOpenIssues = Object.keys(idToIsOpen).length;

  const handleOnChange = (id) => {
    const updatedCheckedState = { ...idToChecked };
    if (updatedCheckedState[id]) {
      delete updatedCheckedState[id];
    } else {
      updatedCheckedState[id] = true;
    }
    setIdToChecked(updatedCheckedState);

    // update indeterminate state of top checkbox
    const updatedNumChecked = Object.keys(updatedCheckedState).length;
    if (updatedNumChecked === 0) {
      topCheckbox.current.indeterminate = false;
    } else if (updatedNumChecked === numOpenIssues) {
      topCheckbox.current.indeterminate = false;
    } else {
      topCheckbox.current.indeterminate = true;
    }
  };

  const handleSelectDeselectAll = (event) => {
    if (event.target.checked) {
      setIdToChecked({ ...idToIsOpen });
    } else {
      setIdToChecked({});
    }
  };

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>
            <input
              ref={topCheckbox}
              className={classes.checkbox}
              type="checkbox"
              checked={numChecked === numOpenIssues}
              onChange={handleSelectDeselectAll}
            />
          </th>
          <th className={classes.numChecked}>
            {numChecked ? `Selected ${numChecked}` : "None selected"}
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
          let issueIsOpen = status === "open";
          return (
            <tr
              key={id}
              className={
                issueIsOpen ? classes.openIssue : classes.resolvedIssue
              }
              style={{ backgroundColor: idToChecked[id] ? "#eee" : "#fff" }}
            >
              <td>
                <input
                  className={classes.checkbox}
                  type="checkbox"
                  checked={!!idToChecked[id]}
                  onChange={() => handleOnChange(id)}
                  disabled={!issueIsOpen}
                />
              </td>
              <td>{name}</td>
              <td>{message}</td>
              <td>
                {issueIsOpen ? (
                  <span className={classes.greenCircle} />
                ) : (
                  <span className={classes.redCircle} />
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default Table;
