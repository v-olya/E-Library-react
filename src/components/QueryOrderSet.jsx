import { useState } from "react";
import { DataTable } from "./DataTable";
import PropTypes from "prop-types";

import { titleRegEx, nameRegEx } from "../helpers/constants.js";

export const QueryOrderSet = ({ tableType }) => {
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

  return (
    <>
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
            onChange={(e) => {
              setOrderBy(e.target.value);
            }}
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

      <DataTable orderBy={orderBy} query={query} tableType={tableType} />
    </>
  );
};

QueryOrderSet.propTypes = {
  tableType: PropTypes.oneOf(["authors", "books"]).isRequired,
};
