// src/hooks/useFetchProducts.js
import { useState, useEffect } from "react";

const API_PRODUCT = "https://dummyjson.com/products/?l";

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
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, error, loading };
}

export default useFetchProducts;
