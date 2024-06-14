import React, { useState } from 'react';

const SearchBar = ({ search, onSearchChange, onSearch }) => {
  const [localSearch, setLocalSearch] = useState(search);

  const handleSearch = () => {
    onSearch(localSearch);
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={localSearch}
        onChange={e => setLocalSearch(e.target.value)}
        className="border p-2 rounded mr-2"
        placeholder="Buscar..."
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;