import React from 'react';

const SearchBar = ({ onSearchChange, search }) => {
  return (
    <input
      type="text"
      placeholder="Buscar..."
      className="p-2 border border-gray-300 rounded w-full"
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
};

export default SearchBar;