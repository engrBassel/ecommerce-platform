import { useState } from "react";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../state/cartSlice";

const Product = ({ product }) => {
  const [showDesc, setShowDesc] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    setIsClicked(true);
    dispatch(addToCart(product));
    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  };

  const shortenText = (text) => {
    return text.length > 25 ? text.substring(0, 25) + "..." : text;
  };

  return (
    <div className="grid grid-rows-[min-content_min-content_min-content_1fr] gap-4 border rounded-lg p-4 relative bg-light-green">
      {product.inLocal && (
        <div className="absolute top-1 right-1 flex space-x-2 p-2 rounded-lg bg-light-green">
          <button
            onClick={() => setEditModalOpen(true)}
            className="text-blue-500 hover:text-blue-700"
          >
            <PencilIcon className="h-6 w-6" />
          </button>
          <EditProductModal
            isOpen={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
            product={product}
          />

          <button
            onClick={() => setDeleteModalOpen(true)}
            className="text-red-500 hover:text-red-700"
          >
            <TrashIcon className="h-6 w-6" />
          </button>
          <DeleteProductModal
            isOpen={isDeleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            productId={product.id}
            productTitle={product.title}
          />
        </div>
      )}
      <div className="flex justify-center bg-white h-[300px] overflow-hidden rounded-lg">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain max-w-full block"
        />
      </div>
      <h3 className="text-lg font-bold">{product.title}</h3>

      <p className="text-lg font-semibold ml-auto">
        ${product.price.toFixed(2)}
      </p>

      <p
        className="text-gray-600 inline-block self-start"
        title={product.description}
      >
        {showDesc ? product.description : shortenText(product.description)}
        {product.description.length > 25 && (
          <button className="underline" onClick={() => setShowDesc(!showDesc)}>
            {showDesc ? "hide" : "show"}
          </button>
        )}
      </p>

      <Button onClick={handleAddToCart} className="w-full">
        {isClicked ? "Added" : "Add to Cart"}
      </Button>
    </div>
  );
};

export default Product;
