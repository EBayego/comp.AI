import React from 'react';

const FilterPopup = ({ filter, onFilterChange, onClose }) => {
  const handleMaxPriceChange = (e) => {
    onFilterChange({ ...filter, maxPrice: e.target.value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Filtros</h2>
        <div className="mb-4">
          <label className="block mb-2">Precio Máximo</label>
          <input
            type="number"
            value={filter.maxPrice}
            onChange={handleMaxPriceChange}
            placeholder="Precio Máximo"
            className="border p-2 rounded w-full"
          />
        </div>
        <button onClick={onClose} className="bg-blue-500 text-white p-2 rounded">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default FilterPopup;