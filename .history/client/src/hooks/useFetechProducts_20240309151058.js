// src/hooks/useFetchProducts.js
import { useState, useEffect } from "react";

const API_PRODUCT = "https://dummyjson.com/products/?limit=0";

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
        log
        // await saveProductsToServer(data.products);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const saveProductsToServer = async (products) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products }),
      });
      if (!response.ok) {
        throw new Error(
          `Failed to save products to the server. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error saving products to server:", error);
    }
  };
  return { products, error, loading };
}

export default useFetchProducts;
