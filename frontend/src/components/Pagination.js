import React from 'react';

const Pagination = ({ currentPage, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handlePrevious}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-l"
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <span className="px-4 py-2">{currentPage}</span>
      <button
        onClick={handleNext}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-r"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;