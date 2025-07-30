import { useEffect, useState, useCallback, useRef } from 'react';
import api from '../utils/axiosConfig';

export default function useProducts(params) {
  const [data, setData] = useState({ products: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const lastParamsRef = useRef(null);
  const abortControllerRef = useRef(null);

  const fetchProducts = useCallback(async (queryParams) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      setLoading(true);
      setError(null);
      
      const processedParams = { ...queryParams };
      
      if (processedParams.minPrice) {
        processedParams.minPrice = parseFloat(processedParams.minPrice);
      }
      if (processedParams.maxPrice) {
        processedParams.maxPrice = parseFloat(processedParams.maxPrice);
      }
      
      const response = await api.get('/products', { 
        params: processedParams,
        signal: abortControllerRef.current.signal
      });
      
      setData(response.data);
      lastParamsRef.current = JSON.stringify(processedParams);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.response?.data?.message || 'Failed to fetch products');
        setData({ products: [], total: 0 });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const currentParamsString = JSON.stringify(params);
    
    if (lastParamsRef.current === currentParamsString) {
      return;
    }

    const timeoutId = setTimeout(() => {
      fetchProducts(params);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [params, fetchProducts]);

  return { ...data, loading, error };
}