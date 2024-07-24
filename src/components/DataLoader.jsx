import { useState } from "react";
import { useFetchToGETdata } from "../hooks/useFetchToGETdata";

import { AuthorsTable } from "./AuthorsTable";
import { BooksTable } from "./BooksTable";

import { URL } from "../helpers/constants.js";
import PropTypes from "prop-types";

export const DataLoader = ({ tableType, orderBy, query }) => {
  const res = useFetchToGETdata(
    `${URL}/api/${tableType}/`,
    false,
    orderBy,
    query,
  );

  const [result, setResult] = useState({});
  const [prevData, setPrevData] = useState(res.data);
  const [prevError, setPrevError] = useState(res.error);
  const [prevLoading, setPrevLoading] = useState(res.loading);

  if (res.data !== prevData) {
    setPrevData(res.data);
    setResult(res);
  }
  if (res.error !== prevError) {
    setPrevError(res.error);
    setResult(res);
  }
  if (res.loading !== prevLoading) {
    setPrevLoading(res.loading);
    setResult(res);
  }
  const setList = (data) => setResult({ ...result, data });

  const { error, data, loading } = result;

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

DataLoader.propTypes = {
  tableType: PropTypes.oneOf(["authors", "books"]).isRequired,
  orderBy: PropTypes.string,
  query: PropTypes.string,
};
