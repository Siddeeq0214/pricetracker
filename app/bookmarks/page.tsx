"use client"

import React, { useEffect, useState } from "react";
import SavedProductCard from "@/components/SavedProductCard";
import { SavedProduct } from "@/types"; // Import the types

const BookmarksPage = () => {
  const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([]); // Use SavedProduct type for state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedProducts = async () => {
      try {
        const response = await fetch("/api/bookmark"); // Fetch saved products from API
        const data = await response.json();

        if (response.ok) {
          // Set saved products data
          setSavedProducts(data.data); 
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Failed to fetch saved products.");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-600 shadow-md rounded-lg py-4 px-8 text-center mb-12">
        Your Bookmarked Products
      </h1>

      {savedProducts.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="text-xl">You have no saved products yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Iterate over saved products and render the SavedProductCard */}
          {savedProducts.map((savedProduct) => (
            <div
              key={savedProduct._id}
              className="transform hover:scale-105 transition-transform duration-300"
            >
              <SavedProductCard savedProduct={savedProduct} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;

