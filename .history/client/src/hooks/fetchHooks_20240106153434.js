import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from "../helper/helper";

axios.defaults.baseURL = 'http://localhost:8080';
const API_PRODUCT = "https://dummyjson.com/products";

/** custom hook */
export default function useFetch(query) {
  // console.log(query);
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

        const { username } = !query ? await getUsername() : "";

        const { data, status } = !query
          ? await axios.get(`v1/api/user/${username}`)
          : await axios.get(`v1/api/${query}`);

        if (status === 201) {
          setData((prev) => ({ ...prev, isLoading: false }));
          setData((prev) => ({ ...prev, apiData: data, status: status }));
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


// export function useProduct(){
  const fetchProduct = async (url) => {
    const [product, setProducts] = useState([]);
    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Failed to fetch data. Status: ${res.status}`);
      }

      const data = await res.json();

      if (
        data.products &&
        Array.isArray(data.products) &&
        data.products.length > 0
      ) {
        setProducts(data.products);
        console.log("Products array:", data.products);
      } else {
        console.log("Empty or invalid products array:", data.products);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  // useEffect(()=> {
  //   fetchProduct(API_PRODUCT);
  // },[]);
  // console.log(product);
  // return product;
// }