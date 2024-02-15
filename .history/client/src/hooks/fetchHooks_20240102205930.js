import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from "../../helper/helper";

axios.defaults.baseURL = "http://localhost:8080";

/** custom hook */
export default function useFetch(query) {
  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));
        // const temp = await getUsername()
        console.log("await getUsername : ", query);             
        const { data, status } = !query
          ? await axios.get(`/api/user/${username}`)
          : await axios.get(`/api/${query}`);

          if (status === 201) {
            setData((prev)=> ({apiData:data}));
        //   setData((prev) => ({ ...prev, isLoading: false }));
        //   setData((prev) => ({ ...prev, apiData: data, status: status }));
        console.log(data, status);
        }
        setData((prev) => ({ ...prev, isLoading: false }));
      } catch (error) {
        setData((prev) => ({ ...prev, isLoading: false, serverError: error }));
      }
    };
    fetchData();
  }, [query]);

  return [getData, setData];
}
