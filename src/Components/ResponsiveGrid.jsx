import React from 'react';
import ProductCard from './ProductCard';

  
const ResponsiveGrid = ({products}) => {

  return (
    <div className="relative container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((card) => (
          <ProductCard product={card} key={card.id}/>
        ))}
      </div>
    </div>
  );
};

export default ResponsiveGrid;


