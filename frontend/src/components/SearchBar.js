import React, { useState } from 'react';
import FilterPopup from './FilterPopup';

const SearchBar = ({ search, onSearchChange, onSearch, filter, onFilterChange }) => {
  const [localSearch, setLocalSearch] = useState(search);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSearch = () => {
    onSearch(localSearch);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center justify-center mb-2 w-full">
        <input
          type="text"
          value={localSearch}
          onChange={e => setLocalSearch(e.target.value)}
          className="border p-2 rounded mr-2 w-1/3"
          placeholder="Buscar..."
        />
        <select 
          value={filter.category} 
          onChange={e => onFilterChange({ ...filter, category: e.target.value })}
          className="border p-2 rounded mr-2"
        >
          <option value="cpu">CPU</option>
          <option value="gpu">GPU</option>
          <option value="motherboard">Motherboard</option>
          <option value="case">Case</option>
        </select>
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">
          Buscar
        </button>
        <button onClick={togglePopup} className="bg-gray-500 text-white p-2 rounded ml-2">
          Filtros
        </button>
      </div>
      {isPopupOpen && (
        <FilterPopup filter={filter} onFilterChange={onFilterChange} onClose={togglePopup} />
      )}
    </div>
  );
};

export default SearchBar;