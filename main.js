import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios.get('https://api.example.com/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleDeleteProduct = (product) => {
    axios.delete(`https://api.example.com/products/${product.id}`)
      .then(() => {
        setProducts(products.filter(p => p.id !== product.id));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span>
            <span>{product.price}</span>
            <button onClick={() => handleSelectProduct(product)}>Select</button>
            <button onClick={() => handleDeleteProduct(product)}>Delete</button>
          </li>
        ))}
      </ul>
      {selectedProduct && (
        <div>
          <h2>{selectedProduct.name}</h2>
          <p>{selectedProduct.description}</p>
          <p>{selectedProduct.price}</p>
        </div>
      )}
    </div>
  );
};

export default Product;
