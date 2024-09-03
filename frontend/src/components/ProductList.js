import React from 'react';

const ProductList = ({ products }) => {
  if (!Array.isArray(products)) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <div 
          key={index} 
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <h3 className="text-2xl font-bold mb-4">{product.Model ? product.Model : product.Name}</h3>
          {/* Agrega más detalles del producto según sea necesario */}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
