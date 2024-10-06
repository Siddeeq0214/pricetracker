import { getRecentProducts } from "@/lib/actions";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";

export const dynamic = 'force-dynamic'; // Ensure dynamic rendering of the page

const RecentProducts = async () => {
  // Fetch the recent products
  const recentProducts: Product[] = await getRecentProducts();

  // If no recent products are found, display a fallback message
  if (!recentProducts || recentProducts.length === 0) {
    return (
      <div className="container mx-auto text-center mt-16 px-4">
        <p className="text-2xl font-semibold text-gray-600">
          No Recent Products Found
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Fancy header with gradient and shadow */}
      <h2 className="text-3xl sm:text-4xl font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-600 shadow-md rounded-lg py-4 px-6 sm:px-8 text-center mb-8 sm:mb-12">
        Recently Searched Products
      </h2>

      {/* Responsive grid layout for product cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {recentProducts.map((product) => (
          <div
            key={product._id}
            className="transform hover:scale-105 transition-transform duration-300"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProducts;


