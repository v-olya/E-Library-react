import { useState } from "react";
import { List } from "./List";
import { titleRegEx, nameRegEx } from "../helpers/constants.js";

export const Home = () => {
  const [tableType, setTableType] = useState("authors");
  const [orderBy, setOrderBy] = useState("id");
  const [query, setQuery] = useState("");

  const tableA = tableType === "authors";

  const orderOptions = tableA
    ? ["first_name", "last_name", "birth_date"]
    : ["title", "isbn", "publication_date"];

  const handleInput = (e) => {
    if (!e.target.value) {
      setQuery("");
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.query.value);
  };
  const handleTableSwitch = (e) => {
    setQuery("");
    setOrderBy("id");
    document.forms.search.reset();
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
      <form id="search" name="search" className="txt-c" onSubmit={handleSearch}>
        <input
          id="query"
          type="search"
          name="query"
          title={
            tableA
              ? "Cannot contain spaces and special characters except { ' }"
              : "Can contain letters, numbers, spaces and special characters from the list & , . - — ; : ! ' "
          }
          placeholder={tableA ? "Name or surname" : "Title or ISBN"}
          pattern={tableA ? nameRegEx : titleRegEx}
          onChange={handleInput}
        />
        <button id="searchButton" type="submit">
          Search by fragment
        </button>
        <label htmlFor="order">
          Order by &nbsp;&nbsp;&nbsp;
          <select
            id="order"
            name="order"
            defaultValue="id"
            onChange={(e) => setOrderBy(e.target.value)}
          >
            <option value="id" key="0">
              default
            </option>
            {orderOptions.map((opt, i) => (
              <option value={opt} key={i + 1}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      </form>

      <List order={orderBy} query={query} tableType={tableType} />
    </>
  );
};
