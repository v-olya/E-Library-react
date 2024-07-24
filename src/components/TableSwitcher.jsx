import { useState } from "react";
import { QueryOrderSet } from "./QueryOrderSet";

export const TableSwitcher = () => {
  const [tableType, setTableType] = useState("authors");

  const handleTableSwitch = (e) => {
    setTableType(e.target.value.trim());
  };
  return (
    <>
      <label htmlFor="selectedTable" className="txt-c">
        Exploring&nbsp;&nbsp;&nbsp;
        <select
          id="selectedTable"
          name="selectedTable"
          defaultValue={tableType}
          onChange={handleTableSwitch}
        >
          <option value="authors">authors</option>
          <option value="books">books</option>
        </select>
      </label>

      <QueryOrderSet tableType={tableType} key={tableType} />
    </>
  );
};
