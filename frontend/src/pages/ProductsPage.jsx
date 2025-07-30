import { useState, useEffect, useMemo } from 'react';
import useProducts from '../hooks/useProducts';
import useFilterParams from '../hooks/useFilterParams';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import MiniCart from '../components/MiniCart';
import Header from '../components/Header';
import ProductFilters from '../components/ProductFilters';

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const limit = 8;
  
  const {
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
  } = useFilterParams();

  const { products, total, loading, error } = useProducts({ 
    page, 
    limit, 
    ...filterParams 
  });

  const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit]);

  useEffect(() => {
    setPage(1);
  }, [filterParams.search, filterParams.category, filterParams.minPrice, filterParams.maxPrice, filterParams.sort]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600">Error loading products: {error}</div>
        </div>
      </div>
    );
  }

  const hasActiveFilters = filterParams.search || filterParams.category || filterParams.minPrice || filterParams.maxPrice || filterParams.sort;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-3/4">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Products</h1>
            
            <ProductFilters
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              sort={sort}
              setSort={setSort}
              resetFilters={resetFilters}
            />

            {loading && products.length === 0 && !hasActiveFilters ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">Loading products...</div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {hasActiveFilters 
                    ? "No products found matching your criteria" 
                    : "No products available"
                  }
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <Pagination 
                    page={page} 
                    setPage={setPage} 
                    totalPages={totalPages} 
                  />
                )}
              </>
            )}
          </div>
          
          <div className="lg:w-1/4">
            <MiniCart />
          </div>
        </div>
      </div>
    </div>
  );
}