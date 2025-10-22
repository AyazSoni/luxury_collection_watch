import CardFurniture from "./CardFurniture.jsx";
import { ProductProvider, useProduct } from '../context/ProductProvider.jsx';

const ProductCard = () => {

  const { getNewestProducts } = useProduct();
const newproduct = getNewestProducts();

  return (
    <section className="mt-12 ">
   <h1 className="text-xl font-semibold   mt-7 font-extrabold text-gray-600 thick-font my-5 md:text-3xl  text-center"> NEWEST PRODUCTS </h1>
             
    <div class="flex items-center justify-center">
      <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
    { newproduct.map((product) => (
      <CardFurniture key={product.id} product={product} />
         ))
    }
      </div>
    </div>
    </section>
  );
}

export default ProductCard;
