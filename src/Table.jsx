import { useRef } from "react";
import { useMemo, useState } from "react";
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
              ref={topCheckbox}
              className={classes.checkbox}
              type={"checkbox"}
              id={"custom-checkbox-selectDeselectAll"}
              name={"custom-checkbox-selectDeselectAll"}
              value={"custom-checkbox-selectDeselectAll"}
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
        {issues.map(({ id, name, message, status }, index) => {
          let issueIsOpen = status === "open";
          let onClick = issueIsOpen ? () => handleOnChange(id) : null;
          let stylesTr = issueIsOpen
            ? classes.openIssue
            : classes.resolvedIssue;

          return (
            <tr
              key={id}
              className={stylesTr}
              style={{ backgroundColor: checkedById.has(id) ? "#eee" : "#fff" }}
              onClick={onClick}
            >
              <td>
                {issueIsOpen ? (
                  <input
                    className={classes.checkbox}
                    type={"checkbox"}
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={checkedById.has(id)}
                    onChange={() => handleOnChange(id)}
                  />
                ) : (
                  <input
                    className={classes.checkbox}
                    type={"checkbox"}
                    disabled
                  />
                )}
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
