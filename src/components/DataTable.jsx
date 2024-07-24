import { useState } from "react";
import { useFetchToGETdata } from "../hooks/useFetchToGETdata";

import { AuthorsTable } from "./AuthorsTable";
import { BooksTable } from "./BooksTable";

import { URL } from "../helpers/constants.js";
import PropTypes from "prop-types";

export const DataTable = ({ tableType, orderBy, query }) => {
  const res = useFetchToGETdata(
    `${URL}/api/${tableType}/`,
    false,
    orderBy,
    query,
  );
  const [result, setResult] = useState({});
  const [prevData, setPrevData] = useState([]);
  const [prevError, setPrevError] = useState(null);
  const [prevLoading, setPrevLoading] = useState(false);

  if (prevData !== res.data) {
    setPrevData(res.data);
  }
  if (prevError !== res.error) {
    setPrevError(res.error);
  }
  if (prevLoading !== res.loading) {
    setPrevLoading(res.loading);
  }
  if (
    prevData !== res.data ||
    prevError !== res.error ||
    prevLoading !== res.loading
  ) {
    setResult(res);
  }

  const { error, data, loading } = result;
  const setList = (data) => setResult({ ...result, data });

  return error ? (
    <h3 className="danger txt-c">{error.message}</h3>
  ) : !loading && data && !data.length ? (
    <h3 className="danger txt-c">Sorry, nothing found...</h3>
  ) : (
    <div className="table-wrapper">
      {!!data?.length && tableType == "authors" && (
        <AuthorsTable list={data} setList={setList} />
      )}
      {!!data?.length && tableType == "books" && (
        <BooksTable list={data} setList={setList} />
      )}
    </div>
  );
};

DataTable.propTypes = {
  tableType: PropTypes.oneOf(["authors", "books"]).isRequired,
  orderBy: PropTypes.string,
  query: PropTypes.string,
};
