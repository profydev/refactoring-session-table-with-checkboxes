import "./Table.css";

function Table(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>
            <input
              type={"checkbox"}
              id={"custom-checkbox-selectDeselectAll"}
              name={"custom-checkbox-selectDeselectAll"}
              value={"custom-checkbox-selectDeselectAll"}
              checked={props.selectDeselectAllIsChecked}
              onChange={props.handleSelectDeselectAll}
            />
          </th>
          <th className={"table--numCheckboxesSelected"}>
            {props.numCheckboxesSelected
              ? `Selected ${props.numCheckboxesSelected}`
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
        {props.data.map(({ name, message, status }, index) => {
          let issueIsOpen = status === "open";
          let onClick = issueIsOpen ? () => props.handleOnChange(index) : null;
          let stylesTr = issueIsOpen
            ? "table--trAvailable"
            : "table--trScheduled";

          return (
            <tr
              className={stylesTr}
              style={props.checkedState[index]}
              key={index}
              onClick={onClick}
            >
              <td>
                {issueIsOpen ? (
                  <input
                    type={"checkbox"}
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={props.checkedState[index].checked}
                    onChange={() => props.handleOnChange(index)}
                  />
                ) : (
                  <input type={"checkbox"} disabled />
                )}
              </td>
              <td>{name}</td>
              <td>{message}</td>
              <td>
                {issueIsOpen ? (
                  <span className={"table--greenCircle"} />
                ) : (
                  <span className={"table--redCircle"} />
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
