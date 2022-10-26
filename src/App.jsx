import { useMemo, useState } from "react";
import Table from "./Table";
import issues from "./issues";

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

function App() {
  const [idToChecked, setIdToChecked] = useState({});
  const idToIsOpen = useMemo(() => mapOpenIssues(issues), [issues]);

  const handleOnChange = (id) => {
    const updatedCheckedState = { ...idToChecked };
    if (updatedCheckedState[id]) {
      delete updatedCheckedState[id];
    } else {
      updatedCheckedState[id] = true;
    }
    setIdToChecked(updatedCheckedState);
    const totalSelected = Object.keys(updatedCheckedState).length;
    handleIndeterminateCheckbox(totalSelected);
  };

  const handleIndeterminateCheckbox = (total) => {
    const indeterminateCheckbox = document.getElementById(
      "custom-checkbox-selectDeselectAll"
    );
    const numOpenIssues = Object.keys(idToIsOpen).length;

    if (total === 0) {
      indeterminateCheckbox.indeterminate = false;
    }
    if (total > 0 && total < numOpenIssues) {
      indeterminateCheckbox.indeterminate = true;
    }
    if (total === numOpenIssues) {
      indeterminateCheckbox.indeterminate = false;
    }
  };

  const handleSelectDeselectAll = (event) => {
    let { checked } = event.target;

    if (checked) {
      setIdToChecked({ ...idToIsOpen });
    } else {
      setIdToChecked({});
    }
  };

  return (
    <Table
      issues={issues}
      handleSelectDeselectAll={handleSelectDeselectAll}
      handleOnChange={handleOnChange}
      idToChecked={idToChecked}
      numOpenIssues={Object.keys(idToIsOpen).length}
    />
  );
}
export default App;
