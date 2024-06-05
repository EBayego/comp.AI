import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <div key={index} className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow duration-200">
          <h3 className="text-xl font-bold mb-2">{product.Name}</h3>
          {/* Agrega más detalles del producto según sea necesario */}
        </div>
      ))}
    </div>
  );
};

export default ProductList;