import { useEffect, useState } from "react";
import getData from "./api";
export default function useFetch(url) {
  console.log(`into useFetch hook!==`);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState("idle"); // it would be better to use a object with different value as state

  useEffect(() => {
    console.log(`in the useFetch--useEffect---`);
    let doUpdate = true;
    setStatus("loading");
    setData(undefined);
    setError(null);

    getData(url) //  this function will fetch Data from URL
      .then((data) => {
        console.log(`in the useFetch--useEffect-and data is retrieved:`);
        console.dir(data);
        if (doUpdate) {
          console.log(`in the useFetch---start to set data:`);
          setData(data);
          setStatus("success");
        }
      })
      .catch((error) => {
        console.log(`in the useFetch---and error happans when fetch data:`);
        console.dir(error);
        if (doUpdate) {
          setError(error);
          setStatus("error");
        }
      });

    return () => (doUpdate = false);
  }, [url]);
  console.log(`in the useFetch--ready to return: ---`);
  console.dir({ data, status, error });
  return { data, status, error };
}
