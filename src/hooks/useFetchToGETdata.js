import { useState, useEffect, useRef } from "react";
import { useAuthentification } from "../providers/AuthProvider";
import { getURL } from "../helpers/functions.js";

export const useFetchToGETdata = (url, chache, order, query) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const cache = useRef({});

  const user = useAuthentification();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      let res = { status: "Error" };
      try {
        setLoading(true);
        res = await fetch(getURL(url, order, query), {
          signal,
          headers: {
            Authorization: `Token ${user.token}`,
          },
        });
        if (res && !res.ok) {
          throw new Error(res.statusText);
        }
        const json = await res.json();
        if (json && !Array.isArray(json)) {
          throw new Error("Server has not returned the list of items");
        }
        if (cache) {
          if (cache.current[url]) {
            setData(cache.current[url]);
          } else {
            cache.current[url] = json;
            setData(json);
          }
        } else {
          setData(json);
        }
      } catch (err) {
        if (err.name === "AbortError") {
          console.error("Request aborted");
        } else {
          setError({ ...err, message: `Status ${res.status}: ${err.message}` });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      controller.abort();
      setError(null);
      setData([]);
    };
  }, [url, chache, order, query]);

  return { data, error, loading };
};
