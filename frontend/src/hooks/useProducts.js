import { useEffect, useState, useCallback, useRef } from 'react';
import api from '../utils/axiosConfig';

export default function useProducts(params) {
  const [data, setData] = useState({ products: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const lastParamsRef = useRef(null);
  const abortControllerRef = useRef(null);
  const isInitialMount = useRef(true);
  const retryCountRef = useRef(0);
  const requestTimeoutRef = useRef(null);

  const fetchProducts = useCallback(async (queryParams, isRetry = false) => {
    if (requestTimeoutRef.current) {
      clearTimeout(requestTimeoutRef.current);
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      if (!isRetry) {
        setLoading(true);
        setError(null);
      }
      
      const processedParams = { ...queryParams };
      
      if (processedParams.minPrice && processedParams.minPrice !== '') {
        processedParams.minPrice = parseFloat(processedParams.minPrice);
      } else {
        delete processedParams.minPrice;
      }
      
      if (processedParams.maxPrice && processedParams.maxPrice !== '') {
        processedParams.maxPrice = parseFloat(processedParams.maxPrice);
      } else {
        delete processedParams.maxPrice;
      }
      
      const response = await api.get('/products', { 
        params: processedParams,
        signal: abortControllerRef.current.signal
      });
      
      setData(response.data);
      lastParamsRef.current = JSON.stringify(processedParams);
      retryCountRef.current = 0;
    } catch (err) {
      if (err.name !== 'AbortError' && err.name !== 'CanceledError') {
        console.error('API Error:', err);

        if (retryCountRef.current === 0 && !isRetry) {
          retryCountRef.current = 1;
          requestTimeoutRef.current = setTimeout(() => {
            fetchProducts(queryParams, true);
          }, 1000);
          return;
        }
        
        setError(err.response?.data?.message || 'Failed to fetch products');
        setData({ products: [], total: 0 });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const currentParamsString = JSON.stringify(params);
    
    if (lastParamsRef.current === currentParamsString && !isInitialMount.current) {
      return;
    }

    isInitialMount.current = false;
    retryCountRef.current = 0;
    
    requestTimeoutRef.current = setTimeout(() => {
      fetchProducts(params);
    }, 150);

    return () => {
      if (requestTimeoutRef.current) {
        clearTimeout(requestTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [params, fetchProducts]);

  return { ...data, loading, error };
}