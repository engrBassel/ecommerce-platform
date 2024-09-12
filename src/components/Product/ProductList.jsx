import Loader from "../UI/Loader";
import Product from "./Product";

const ProductList = ({ products, loading, error }) => {
  if (loading) return <Loader />;

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
