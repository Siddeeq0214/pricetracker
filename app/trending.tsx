import { getAllProducts } from "@/lib/actions"
import ProductCard from "@/components/ProductCard"

const TrendingPage = async () => {
  const allProducts = await getAllProducts(); // Fetch the list of all products

  return (
    <section className="px-6 md:px-20 py-24">
      <h1 className="text-3xl font-bold mb-6">Recently Searched Items</h1>

      <div className="flex flex-wrap gap-x-8 gap-y-16">
        {allProducts?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default TrendingPage
