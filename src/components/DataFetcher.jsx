import { useState, useContext } from "react";
import { Collection } from "../providers/CollectionContext.js";
import { useFetchToGETdata } from "../hooks/useFetchToGETdata";

import { Collection_A } from "./Collection_A";
import { Collection_B } from "./Collection_B";

import { URL } from "../helpers/constants.js";
import PropTypes from "prop-types";

export const DataFetcher = ({ orderBy, query }) => {
  const tableType = useContext(Collection);
  const res = useFetchToGETdata(
    `${URL}/api/${tableType}/`,
    false,
    orderBy,
    query,
  );
  const [result, setResult] = useState(res);
  const [prevLoaded, setPrevLoaded] = useState(false);

  if (prevLoaded !== res.loaded) {
    setPrevLoaded(res.loaded);
    setResult(res);
  }

  const { error, data, loaded } = result;
  const setList = (data) => setResult({ ...result, data });

  return error ? (
    <h3 className="danger txt-c">{error.message}</h3>
  ) : loaded && data && !data.length ? (
    <h3 className="danger txt-c">Sorry, nothing found...</h3>
  ) : (
    <div className="table-wrapper">
      {!!data?.length && tableType == "authors" && (
        <Collection_A list={data} setList={setList} />
      )}
      {!!data?.length && tableType == "books" && (
        <Collection_B list={data} setList={setList} />
      )}
    </div>
  );
};

DataFetcher.propTypes = {
  orderBy: PropTypes.string,
  query: PropTypes.string,
};
