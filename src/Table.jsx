import { useState } from "react";
import classes from "./Table.module.css";

function Table({ issues }) {
  const [checkedById, setCheckedById] = useState(new Set());
  const [selectDeselectAllIsChecked, setSelectDeselectAllIsChecked] =
    useState(false);
  const [numCheckboxesSelected, setNumCheckboxesSelected] = useState(0);

  const handleOnChange = (id) => {
    const updatedCheckedById = new Set(checkedById);
    if (updatedCheckedById.has(id)) {
      updatedCheckedById.delete(id);
    } else {
      updatedCheckedById.add(id);
    }

    setCheckedById(updatedCheckedById);

    const totalSelected = updatedCheckedById.size;
    setNumCheckboxesSelected(totalSelected);
    handleIndeterminateCheckbox(totalSelected);
  };

  const handleIndeterminateCheckbox = (total) => {
    const indeterminateCheckbox = document.getElementById(
      "custom-checkbox-selectDeselectAll"
    );
    let count = 0;

    issues.forEach((element) => {
      if (element.status === "open") {
        count += 1;
      }
    });

    if (total === 0) {
      indeterminateCheckbox.indeterminate = false;
      setSelectDeselectAllIsChecked(false);
    }
    if (total > 0 && total < count) {
      indeterminateCheckbox.indeterminate = true;
      setSelectDeselectAllIsChecked(false);
    }
    if (total === count) {
      indeterminateCheckbox.indeterminate = false;
      setSelectDeselectAllIsChecked(true);
    }
  };

  const handleSelectDeselectAll = (event) => {
    if (event.target.checked) {
      const openIssues = issues.filter(({ status }) => status === "open");
      const allChecked = new Set(openIssues.map(({ id }) => id));
      setCheckedById(allChecked);
      setNumCheckboxesSelected(allChecked.size);
    } else {
      setCheckedById(new Set());
      setNumCheckboxesSelected(0);
    }

    setSelectDeselectAllIsChecked((prevState) => !prevState);
  };

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>
            <input
              className={classes.checkbox}
              type={"checkbox"}
              id={"custom-checkbox-selectDeselectAll"}
              name={"custom-checkbox-selectDeselectAll"}
              value={"custom-checkbox-selectDeselectAll"}
              checked={selectDeselectAllIsChecked}
              onChange={handleSelectDeselectAll}
            />
          </th>
          <th className={classes.numChecked}>
            {numCheckboxesSelected
              ? `Selected ${numCheckboxesSelected}`
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
