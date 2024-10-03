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
    <div className="bookmarks-container">
      <h1 className="text-2xl font-semibold mb-5">Your Bookmarked Products</h1>

      {savedProducts.length === 0 ? (
        <p>You have no saved products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Iterate over saved products and render the SavedProductCard */}
          {savedProducts.map((savedProduct) => (
            <SavedProductCard key={savedProduct._id} savedProduct={savedProduct} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;

