import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface Props {
  product: Product;
}
 
const ProductCard = ({ product }: Props) => {
  return (
    <div className="product-card bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
        <div className="product-card_img-container">
          <Image
            src={product.image}
            alt={product.title}
            width={200}
            height={200}
            className="product-card_img w-full h-40 object-cover"
          />
        </div>

      <div className="p-4 flex flex-col gap-3">
          <h3 className="product-title text-lg font-semibold text-gray-800 hover:text-blue-500 transition-colors duration-200">
            {product.title}
          </h3>

        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-lg">
            {product.currency || '$'}{product.currentPrice || 'N/A'}
          </p>
          {product.isOutOfStock ? (
            <span className="text-red-500 font-bold">Out of Stock</span>
          ) : (
            <span className="text-green-600 font-bold">In Stock</span>
          )}
        </div>

        <Link href={`/products/${product._id}`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 w-full">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};


export default ProductCard