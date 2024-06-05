import React from 'react';

const Filter = ({ onFilterChange, filter }) => {
  return (
    <div className="flex space-x-4">
      <select
        className="p-2 border border-gray-300 rounded"
        value={filter.category}
        onChange={(e) => onFilterChange({ ...filter, category: e.target.value })}
      >
        <option value="">Todos</option>
        <option value="cpu">CPU</option>
        <option value="gpu">GPU</option>
        <option value="motherboard">Motherboard</option>
        <option value="case">Case</option>
      </select>
      <input
        type="number"
        placeholder="Precio máximo"
        className="p-2 border border-gray-300 rounded"
        value={filter.maxPrice}
        onChange={(e) => onFilterChange({ ...filter, maxPrice: e.target.value })}
      />
    </div>
  );
};

export default Filter;