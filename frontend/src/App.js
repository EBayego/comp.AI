import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import ProductSection from './components/ProductSection';

const App = () => {
  const [products, setProducts] = useState({ cpus: [], gpus: [], motherboards: [], cases: [] });
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({ category: '', maxPrice: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/popular-products')
      .then(response => response.json())
      .then(data => {
        setProducts({
          cpus: data.cpus.map(item => ({ ...item, type: 'cpu' })),
          gpus: data.gpus.map(item => ({ ...item, type: 'gpu' })),
          motherboards: data.motherboards.map(item => ({ ...item, type: 'motherboard' })),
          cases: data.cases.map(item => ({ ...item, type: 'case' }))
        });
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const applyFilters = (items) => {
    return items
      .filter(item => item.Name.toLowerCase().includes(search.toLowerCase()))
      .filter(item => !filter.maxPrice || item.Price <= filter.maxPrice);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-4">Componentes de Ordenador</h1>
      <div className="flex justify-between mb-4">
        <SearchBar search={search} onSearchChange={setSearch} />
        <Filter filter={filter} onFilterChange={setFilter} />
      </div>
      <ProductSection title="CPUs Populares" products={applyFilters(products.cpus)} />
      <ProductSection title="GPUs Populares" products={applyFilters(products.gpus)} />
      <ProductSection title="Motherboards Populares" products={applyFilters(products.motherboards)} />
      <ProductSection title="Cases Populares" products={applyFilters(products.cases)} />
    </div>
  );
};

export default App;