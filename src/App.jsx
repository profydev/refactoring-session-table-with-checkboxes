import { useState } from "react";
import Table from "./Table";
import data from "./data";
import { useMemo } from "react";

function App() {
  const [checkedState, setCheckedState] = useState({});
  const openIssues = useMemo(
    () =>
      data.reduce((tmp, { id, status }) => {
        if (status !== "open") {
          return tmp;
        }
        return {
          ...tmp,
          [id]: true,
        };
      }, {}),
    [data]
  );
  const [selectDeselectAllIsChecked, setSelectDeselectAllIsChecked] =
    useState(false);
  const [numCheckboxesSelected, setNumCheckboxesSelected] = useState(0);

  const handleOnChange = (id) => {
    const updatedCheckedState = { ...checkedState };
    if (updatedCheckedState[id]) {
      delete updatedCheckedState[id];
    } else {
      updatedCheckedState[id] = true;
    }
    setCheckedState(updatedCheckedState);

    const totalSelected = Object.keys(updatedCheckedState).length;
    setNumCheckboxesSelected(totalSelected);
    handleIndeterminateCheckbox(totalSelected);
  };

  const handleIndeterminateCheckbox = (total) => {
    const indeterminateCheckbox = document.getElementById(
      "custom-checkbox-selectDeselectAll"
    );
    const numOpenIssues = Object.keys(openIssues).length;

    if (total === 0) {
      indeterminateCheckbox.indeterminate = false;
      setSelectDeselectAllIsChecked(false);
    }
    if (total > 0 && total < numOpenIssues) {
      indeterminateCheckbox.indeterminate = true;
      setSelectDeselectAllIsChecked(false);
    }
    if (total === numOpenIssues) {
      indeterminateCheckbox.indeterminate = false;
      setSelectDeselectAllIsChecked(true);
    }
  };

  const handleSelectDeselectAll = (event) => {
    let { checked } = event.target;

    if (checked) {
      setCheckedState({ ...openIssues });
      const totalSelected = Object.keys(updatedCheckedState).length;
      setNumCheckboxesSelected(totalSelected);
    } else {
      setCheckedState({});
      setNumCheckboxesSelected(0);
    }

    setSelectDeselectAllIsChecked((prevState) => !prevState);
  };

  return (
    <Table
      data={data}
      selectDeselectAllIsChecked={selectDeselectAllIsChecked}
      handleSelectDeselectAll={handleSelectDeselectAll}
      numCheckboxesSelected={numCheckboxesSelected}
      handleOnChange={handleOnChange}
      checkedState={checkedState}
    />
  );
}
export default App;
