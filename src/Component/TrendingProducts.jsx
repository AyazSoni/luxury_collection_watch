import CardFurniture from "./CardFurniture.jsx";
import { ProductProvider, useProduct } from '../context/ProductProvider.jsx';

const TrendingProducts = () => {

  const { getTrendingProducts } = useProduct();
  const trendingProducts = getTrendingProducts();

  return (
    <section className="mt-12 px-4">
      <h1 className="text-2xl font-extrabold text-gray-700 thick-font mb-6 text-center tracking-tight">
        TRENDING PRODUCTS
      </h1>
      <div className="h-1 w-20 rounded-2xl bg-gradient-to-r from-orange-400 to-pink-400 mx-auto mb-8"></div>
          
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 gap-5 w-full max-w-screen-sm">
          {trendingProducts.length > 0 ? (
            trendingProducts.map((product) => (
              <CardFurniture key={product.id} product={product} />
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">No trending products available</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default TrendingProducts;
