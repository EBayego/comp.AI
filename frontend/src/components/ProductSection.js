import React from 'react';
import ProductList from './ProductList';

const ProductSection = ({ title, products }) => {
  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">{title}</h2>
      <ProductList products={products} />
    </section>
  );
};

export default ProductSection;