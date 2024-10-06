import HeroCarousel from "@/components/HeroCarousel";
import Searchbar from "@/components/Searchbar";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/actions";
import Image from "next/image";

const Homepage = async () => {
  const allProducts = await getAllProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl shadow-lg transition-transform duration-300">
        <div className="absolute inset-0 bg-hero-pattern opacity-10 rounded-xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center px-6 md:px-20">
          <div className="md:max-w-lg">
            <p className="text-sm md:text-lg uppercase tracking-wide mb-4">
              Smart Savings Starts Here
              <Image 
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={25}
                height={25}
              />
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Track Your Favorite Discounts with
              <span className="text-yellow-300"> PriceTracker</span>
            </h1>
            <p className="mt-6 text-lg">
              Easily monitor and find discounted items you want to purchase, all in one place.
            </p>
            <Searchbar />
          </div>
          <div className="mt-12 md:mt-0 md:max-w-lg">
            <HeroCarousel />
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-24 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
          Recently Searched Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {allProducts?.map((product) => (
            <div
              key={product._id}
              /*className="rounded-lg border border-gray-200 shadow-lg p-6 transition-transform duration-300 hover:scale-105"*/
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      {/*
      <section className="py-20 bg-gradient-to-r from-green-400 to-blue-500 text-white text-center rounded-xl shadow-lg transition-transform duration-300">
        <h3 className="text-4xl font-bold mb-6">
          Never Miss a Deal Again!
        </h3>
        <p className="text-lg mb-8">
          Sign up for PriceTracker and get notified when your favorite products are discounted.
        </p>
        <button className="px-8 py-3 bg-yellow-300 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-transform duration-300 hover:scale-105">
          Sign Up Now
        </button>
      </section>
        */}
    </>
  );
};

export default Homepage;

