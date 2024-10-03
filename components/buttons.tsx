"use client"; // Client-side component

import Image from "next/image";
import { useState } from "react";

type Props = {
  productId: string;
  productUrl: string;
};

const BookmarkAndShareButtons = ({ productId, productUrl }: Props) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = async () => {
    try {
      console.log(`Bookmarking product with id: ${productId}`);
      
      // Make a POST request to save the product
      const response = await fetch('/api/bookmark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        setIsBookmarked(true);
        console.log('Product bookmarked successfully');
      } else {
        console.error('Failed to bookmark product');
      }
    } catch (error) {
      console.error('Error bookmarking product:', error);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this product!",
          url: productUrl,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      navigator.clipboard.writeText(productUrl);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        className="p-2 bg-white-200 rounded-10"
        onClick={handleBookmark}
        aria-label="Bookmark"
      >
        <Image
          src="/assets/icons/bookmark.svg"
          alt="bookmark"
          width={20}
          height={20}
        />
      </button>

      <button
        className="p-2 bg-white-200 rounded-10"
        onClick={handleShare}
        aria-label="Share"
      >
        <Image
          src="/assets/icons/share.svg"
          alt="share"
          width={20}
          height={20}
        />
      </button>
    </div>
  );
};

export default BookmarkAndShareButtons;
