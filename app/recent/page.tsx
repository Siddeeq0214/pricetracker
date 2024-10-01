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
      <div className="container mx-auto text-center mt-16">
        <p className="text-2xl font-semibold text-gray-600">
          No Recent Products Found
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16">
      {/* Fancy header with gradient and shadow */}
      <h2 className="text-4xl font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-600 shadow-md rounded-lg py-4 px-8 text-center mb-12">
        Recently Added Products
      </h2>

      {/* Responsive grid layout for product cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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


