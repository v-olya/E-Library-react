import { useState, useEffect } from "react";
import { useAuthentification } from "../providers/AuthProvider";
import { getURL } from "../helpers/functions.js";

//cacheable = true when we download Books collection as an auxiliary for the default page Authors.
//If the user has switched to BooksTable, we remove the cache, since the "books" can be modified.

export const useFetchToGETdata = (url, cacheable, order, query) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const user = useAuthentification();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      let res = { status: "Error" };
      try {
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
        setData(json);
        if (cacheable) {
          sessionStorage.setItem(url, JSON.stringify(json));
        }
      } catch (err) {
        if (err.name === "AbortError") {
          console.error("Request aborted");
        } else {
          setError({ ...err, message: `Status ${res.status}: ${err.message}` });
        }
      } finally {
        setLoaded(true);
      }
    };

    if (cacheable) {
      const cache = sessionStorage.getItem(url);
      if (cache) {
        setData(JSON.parse(cache));
        setLoaded(true);
      } else {
        fetchData();
      }
    }
    if (!cacheable) {
      if (new URL(url).pathname == "/api/books/") {
        sessionStorage.removeItem(url);
      }
      fetchData();
    }
    return () => {
      controller.abort();
      setError(null);
      setLoaded(false);
      setData([]);
    };
  }, [url, cacheable, order, query]);

  return { data, error, loaded };
};
