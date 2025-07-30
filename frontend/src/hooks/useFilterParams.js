import { useState, useEffect, useCallback, useMemo } from 'react';

export default function useFilterParams() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sort, setSort] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const resetFilters = useCallback(() => {
    setSearch('');
    setCategory('');
    setPriceRange({ min: '', max: '' });
    setSort('');
  }, []);

  const filterParams = useMemo(() => ({
    search: debouncedSearch,
    category,
    minPrice: priceRange.min,
    maxPrice: priceRange.max,
    sort
  }), [debouncedSearch, category, priceRange.min, priceRange.max, sort]);

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