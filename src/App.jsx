import { useEffect, useState } from "react";
import Table from "./Table";
import data from "./data";

function App() {
  const [checkedState, setCheckedState] = useState(
    new Array(data.length).fill({ checked: false, backgroundColor: "#ffffff" })
  );
  const [selectDeselectAllIsChecked, setSelectDeselectAllIsChecked] =
    useState(false);
  const [numCheckboxesSelected, setNumCheckboxesSelected] = useState(0);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((element, index) => {
      if (position === index) {
        return {
          ...element,
          checked: !element.checked,
          backgroundColor: element.checked ? "#ffffff" : "#eeeeee",
        };
      }
      return element;
    });
    setCheckedState(updatedCheckedState);

    const totalSelected = updatedCheckedState
      .map((element) => element.checked)
      .reduce((sum, currentState, index) => {
        if (currentState) {
          return sum + data[index].value;
        }
        return sum;
      }, 0);
    setNumCheckboxesSelected(totalSelected);

    handleIndeterminateCheckbox(totalSelected);
  };

  const handleIndeterminateCheckbox = (total) => {
    const indeterminateCheckbox = document.getElementById(
      "custom-checkbox-selectDeselectAll"
    );
    let count = 0;

    data.forEach((element) => {
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
    let { checked } = event.target;

    const allTrueArray = [];
    data.forEach((element) => {
      if (element.status === "open") {
        allTrueArray.push({ checked: true, backgroundColor: "#eeeeee" });
      } else {
        allTrueArray.push({ checked: false, backgroundColor: "#ffffff" });
      }
    });

    const allFalseArray = new Array(data.length).fill({
      checked: false,
      backgroundColor: "#ffffff",
    });
    checked ? setCheckedState(allTrueArray) : setCheckedState(allFalseArray);

    const totalSelected = (checked ? allTrueArray : allFalseArray)
      .map((element) => element.checked)
      .reduce((sum, currentState, index) => {
        if (currentState && data[index].status === "open") {
          return sum + data[index].value;
        }
        return sum;
      }, 0);
    setNumCheckboxesSelected(totalSelected);
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
