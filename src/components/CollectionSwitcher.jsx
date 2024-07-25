import { useState } from "react";
import { Collection } from "../providers/CollectionContext.js";
import { GETparamsForm } from "./GETparamsForm";

export const CollectionSwitcher = () => {
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
      <Collection.Provider value={tableType}>
        <GETparamsForm tableType={tableType} key={tableType} />
      </Collection.Provider>
    </>
  );
};
