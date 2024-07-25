import { useState, useEffect } from "react";
import { useAuthentification } from "../providers/AuthProvider";
import { getURL } from "../helpers/functions.js";

//Assign cacheable=true when we download the "books" collection as an auxiliary for the default AuthorsTable. 
//If the user has switched to BooksTable, we remove the cache, since the "books" can be modified.

export const useFetchToGETdata = (url, cacheable, order, query) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = useAuthentification();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      setLoading(true);
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
        setLoading(false);
      }
    };
    
    if (cacheable) {
      const cache = sessionStorage.getItem(url);
      if (cache) {
        setData(JSON.parse(cache));
      } else {
        fetchData();
      }
    } 
    if (!cacheable) {
      if (new URL(url).pathname="/api/books/") {
        sessionStorage.removeItem(url);
      }
      fetchData(); 
    }
    return () => {
      controller.abort();
      setError(null);
      setData([]);
    };
  }, [url, cacheable, order, query]);

  return { data, error, loading };
};
