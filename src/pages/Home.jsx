import Filter from "../components/Product/Filter";
import Sorting from "../components/Product/Sorting";
import ProductList from "../components/Product/ProductList";
import Button from "../components/UI/Button";
import { useEffect, useState } from "react";
import CreateProductModal from "../components/Product/CreateProductModal";
import { useSelector } from "react-redux";

function Home() {
  const products = useSelector((state) => state.products.array);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const [displayedProducts, setdisplayedProducts] = useState([...products]);
  const [filter, setFilter] = useState("");
  const [sorting, setSorting] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let newProducts;

    if (filter) {
      newProducts = products.filter((product) => product.category === filter);
    } else {
      newProducts = [...products];
    }

    if (sorting === "price-asc") {
      newProducts.sort((a, b) => a.price - b.price);
    } else if (sorting === "price-desc") {
      newProducts.sort((a, b) => b.price - a.price);
    } else if (sorting === "title-asc") {
      newProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sorting === "title-desc") {
      newProducts.sort((a, b) => b.title.localeCompare(a.title));
    }

    setdisplayedProducts(newProducts);
  }, [products, filter, sorting]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-4 flex-wrap gap-x-2 gap-y-4">
        <Filter filter={filter} setFilter={setFilter} />
        <Sorting sorting={sorting} setSorting={setSorting} />
        <Button onClick={() => setIsModalOpen(true)}>New Product</Button>
        <CreateProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
      <ProductList
        products={displayedProducts}
        loading={loading}
        error={error}
      />
    </div>
  );
}
export default Home;
