import { PriceHistoryItem, Product } from "@/types";

const Notification = {
  WELCOME: 'WELCOME',
  CHANGE_OF_STOCK: 'CHANGE_OF_STOCK',
  LOWEST_PRICE: 'LOWEST_PRICE',
  THRESHOLD_MET: 'THRESHOLD_MET',
}

const THRESHOLD_PERCENTAGE = 40;

// Extracts and returns the price from a list of possible elements.
export function extractPrice(...elements: any) {
  for (const element of elements) {
    const priceText = element.text().trim();

    if(priceText) {
      const cleanPrice = priceText.replace(/[^\d.]/g, '');

      let firstPrice; 

      if (cleanPrice) {
        firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0];
      } 

      return firstPrice || cleanPrice;
    }
  }

  return '';
}

// Extracts and returns the currency symbol.
export function extractCurrency(element: any) {
  const currencyText = element.text().trim().slice(0, 1);
  return currencyText ? currencyText : "";
}

// Extracts description from from amazon
export function extractDescription($: any) {
  // these are possible elements holding description of the product
  const selectors = [
    ".a-unordered-list .a-list-item",
    ".a-expander-content p",
    // Add more selectors here if needed
  ];

  for (const selector of selectors) {
    const elements = $(selector);
    if (elements.length > 0) {
      const textContent = elements
        .map((_: any, element: any) => $(element).text().trim())
        .get()
        .join("\n");
      return textContent;
    }
  }

  return "";
}

// Extracts customer review count from Amazon
export function extractReviewCount($: any) {
  const reviewSelector = [
    "#acrCustomerReviewText", // common selector for review count text
    ".a-size-base .reviewCountTextLinkedHistogram", // alternative selector
    // Add more selectors here if needed
  ];

  for (const selector of reviewSelector) {
    const reviewElement = $(selector);

    if (reviewElement.length > 0) {
      // Extract the review text
      const reviewText = reviewElement.text().trim();

      // Remove any non-digit characters to get just the review count
      const reviewCount = reviewText.replace(/[^\d]/g, '');

      // If a valid review count was found, return it
      if (reviewCount) {
        return parseInt(reviewCount, 10);
      }
    }
  }

  // If no review count is found, return 0
  return 0;
}

// Extracts star rating from Amazon
export function extractStarRating($: any) {
  const starSelectors = [
    ".a-icon-alt", // Common selector for star rating text
    ".reviewCountTextLinkedHistogram .a-declarative", // Alternative selector
    // Add more selectors if needed
  ];

  for (const selector of starSelectors) {
    const starElement = $(selector);

    if (starElement.length > 0) {
      // Extract the rating text, e.g., "4.5 out of 5 stars"
      const starText = starElement.text().trim();

      // Use a regular expression to extract the numeric star rating
      const starRating = starText.match(/\d+(\.\d+)?/);

      // If a valid star rating was found, return it as a number
      if (starRating) {
        return parseFloat(starRating[0]);
      }
    }
  }

  // If no star rating is found, return 0
  return 0;
}

// Extracts the product category from Amazon
export function extractCategory($: any) {
  // These are possible elements holding the category of the product
  const selectors = [
    "#wayfinding-breadcrumbs_feature_div ul li", // Breadcrumb section for categories
    ".nav-a-content", // Sometimes categories are listed in a navigation section
    ".a-link-normal.a-color-tertiary", // Alternative category selector
    // Add more selectors here if needed
  ];

  for (const selector of selectors) {
    const elements = $(selector);
    if (elements.length > 0) {
      const categoryText = elements
        .map((_: any, element: any) => $(element).text().trim())
        .get()
        .join(" > "); // Join categories with '>' to create a breadcrumb-like format
      return categoryText;
    }
  }

  return "Unknown Category"; // Fallback if no category is found
}


export function getHighestPrice(priceList: PriceHistoryItem[]) {
  let highestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price > highestPrice.price) {
      highestPrice = priceList[i];
    }
  }

  return highestPrice.price;
}

export function getLowestPrice(priceList: PriceHistoryItem[]) {
  let lowestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price < lowestPrice.price) {
      lowestPrice = priceList[i];
    }
  }

  return lowestPrice.price;
}

export function getAveragePrice(priceList: PriceHistoryItem[]) {
  const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
  const averagePrice = sumOfPrices / priceList.length || 0;

  return averagePrice;
}

export const getEmailNotifType = (
  scrapedProduct: Product,
  currentProduct: Product
) => {
  const lowestPrice = getLowestPrice(currentProduct.priceHistory);

  if (scrapedProduct.currentPrice < lowestPrice) {
    return Notification.LOWEST_PRICE as keyof typeof Notification;
  }
  if (!scrapedProduct.isOutOfStock && currentProduct.isOutOfStock) {
    return Notification.CHANGE_OF_STOCK as keyof typeof Notification;
  }
  if (scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE) {
    return Notification.THRESHOLD_MET as keyof typeof Notification;
  }

  return null;
};

export const formatNumber = (num: number = 0) => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};
