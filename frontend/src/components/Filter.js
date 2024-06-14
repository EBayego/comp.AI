import React from 'react';

const Filter = ({ filter, onFilterChange }) => {
  const handleCategoryChange = (e) => {
    onFilterChange({ ...filter, category: e.target.value });
  };

  const handleMaxPriceChange = (e) => {
    onFilterChange({ ...filter, maxPrice: e.target.value });
  };

  return (
    <div className="flex items-center">
      <select value={filter.category} onChange={handleCategoryChange} className="border p-2 rounded mr-2">
        <option value="Todos">Todos</option>
        <option value="cpu">CPU</option>
        <option value="gpu">GPU</option>
        <option value="motherboard">Motherboard</option>
        <option value="case">Case</option>
      </select>
      <input
        type="number"
        value={filter.maxPrice}
        onChange={handleMaxPriceChange}
        placeholder="Precio Máximo"
        className="border p-2 rounded"
      />
    </div>
  );
};

export default Filter;