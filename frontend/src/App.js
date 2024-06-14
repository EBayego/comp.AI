import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import ProductSection from './components/ProductSection';
import Pagination from './components/Pagination';

const App = () => {
  const [popularProducts, setPopularProducts] = useState({ cpus: [], gpus: [], motherboards: [], cases: [] });
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({ category: 'Todos', maxPrice: '' });
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch('http://localhost:5000/api/popular-products')
      .then(response => response.json())
      .then(data => {
        setPopularProducts({
          cpus: data.cpus.map(item => ({ ...item, type: 'cpu' })),
          gpus: data.gpus.map(item => ({ ...item, type: 'gpu' })),
          motherboards: data.motherboards.map(item => ({ ...item, type: 'motherboard' })),
          cases: data.cases.map(item => ({ ...item, type: 'case' }))
        });
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const fetchSearchResults = (search, category, maxPrice, page) => {
    const limit = 25;
    const offset = (page - 1) * limit;
    let query = `http://localhost:5000/api/search?limit=${limit}&offset=${offset}`;

    if (category) {
      query += `&category=${category}`;
    }
    if (search) {
      query += `&search=${encodeURIComponent(search)}`;
    }
    if (maxPrice) {
      query += `&maxPrice=${maxPrice}`;
    }

    fetch(query)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setSearchResults(Array.isArray(data) ? data : []))
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    if (search || filter.category !== 'Todos' || filter.maxPrice) {
      fetchSearchResults(search, filter.category, filter.maxPrice, page);
    }
  }, [filter, search, page]);

  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);
    setPage(1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-4">Componentes de Ordenador</h1>
      <div className="flex justify-between mb-4">
        <SearchBar search={search} onSearchChange={setSearch} onSearch={handleSearch} />
        <Filter filter={filter} onFilterChange={setFilter} />
      </div>
      {search || filter.category !== 'Todos' || filter.maxPrice ? (
        <ProductSection title="Resultados de Búsqueda" products={searchResults} />
      ) : (
        <>
          <ProductSection title="CPUs Populares" products={popularProducts.cpus} />
          <ProductSection title="GPUs Populares" products={popularProducts.gpus} />
          <ProductSection title="Motherboards Populares" products={popularProducts.motherboards} />
          <ProductSection title="Cases Populares" products={popularProducts.cases} />
        </>
      )}
      <Pagination currentPage={page} onPageChange={setPage} />
    </div>
  );
};

export default App;