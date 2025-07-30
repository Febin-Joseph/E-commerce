import { useState, useEffect, useCallback, useMemo } from 'react';

export default function useFilterParams() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [debouncedPriceRange, setDebouncedPriceRange] = useState({ min: '', max: '' });
  const [sort, setSort] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPriceRange(priceRange);
    }, 800);

    return () => clearTimeout(timer);
  }, [priceRange]);

  const resetFilters = useCallback(() => {
    setSearch('');
    setCategory('');
    setPriceRange({ min: '', max: '' });
    setSort('');
  }, []);

  const filterParams = useMemo(() => ({
    search: debouncedSearch,
    category,
    minPrice: debouncedPriceRange.min,
    maxPrice: debouncedPriceRange.max,
    sort
  }), [debouncedSearch, category, debouncedPriceRange.min, debouncedPriceRange.max, sort]);

  return {
    search,
    setSearch,
    category,
    setCategory,
    priceRange,
    setPriceRange,
    sort,
    setSort,
    resetFilters,
    filterParams
  };
} 