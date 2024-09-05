import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../app.css'

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => console.error("Error fetching product", error));
  }, [id]);

  if (loading) return <p>Loading product details...</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col lg:flex-row">
        <img src={product.image} alt={product.title} className="h-80 w-full lg:w-1/2 object-cover" />
        <div className="lg:ml-6">
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <p className="text-lg text-gray-700">${product.price}</p>
          <p className="mt-4">{product.description}</p>
          <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
