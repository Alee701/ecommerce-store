import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import SkeletonLoader from './SkeletonLoader';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('');
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  const handleSearch = (searchQuery) => {
    const query = searchQuery.toLowerCase();
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  const handleSort = (e) => {
    const sortValue = e.target.value;
    setSortOption(sortValue);

    let sortedProducts = [...filteredProducts];
    if (sortValue === 'price-asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortValue === 'name-asc') {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    }
    setFilteredProducts(sortedProducts);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    const filtered = e.target.value === 'all'
      ? products
      : products.filter(product => product.category === e.target.value);
    setFilteredProducts(filtered);
  };

  const handlePriceRangeChange = (e) => {
    setPriceRange([0, e.target.value]);
    const filtered = products.filter(product => product.price <= e.target.value);
    setFilteredProducts(filtered);
  };

  const handleRatingChange = (e) => {
    setRatingFilter(e.target.value);
    const filtered = products.filter(product => product.rating.rate >= e.target.value);
    setFilteredProducts(filtered);
  };

  const handleClearFilters = () => {
    setFilteredProducts(products);
    setCategory('all');
    setSortOption('');
    setPriceRange([0, 1000]);
    setRatingFilter(0);
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentProducts = filteredProducts.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (loading) return <SkeletonLoader />;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-6">
      {/* Filters Section */}
      <div id='filtersec' className="flex justify-between my-4">
        <div className="flex space-x-4">
          <select onChange={handleSort} value={sortOption} className="p-2 rounded border">
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
          </select>

          <select onChange={handleCategoryChange} value={category} className="p-2 rounded border">
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>

          {/* Price Range Slider */}
          <div className="flex items-center">
            <label className="mr-2">Price Range: $0 - ${priceRange[1]}</label>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={handlePriceRangeChange}
              className="w-32"
            />
          </div>

          {/* Rating Filter */}
          <select onChange={handleRatingChange} value={ratingFilter} className="p-2 rounded border">
            <option value="0">All Ratings</option>
            <option value="1">1 Star & Above</option>
            <option value="2">2 Stars & Above</option>
            <option value="3">3 Stars & Above</option>
            <option value="4">4 Stars & Above</option>
          </select>
        </div>

        <button onClick={handleClearFilters} className="p-2 bg-red-500 text-white rounded">Clear Filters</button>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`p-2 m-1 rounded-lg ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
