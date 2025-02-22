// src/hooks/useFetchProducts.js
import { useState, useEffect } from "react";
import { saveProductsToServer } from "../helper/helper";

const API_PRODUCT = import.meta.env.VITE_DUMMY_JSON_URL;

function useFetchProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_PRODUCT);
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.products);
        console.log(data.products);
        await saveProductsToServer(data.products);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };

    // fetchProducts();
  }, []); // Empty dependency array ensures this effect runs only once

  return { products, error, loading };
}

export default useFetchProducts;
