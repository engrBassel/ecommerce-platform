import { useDispatch } from "react-redux";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import { deleteProduct } from "../../state/productsSlice";

const DeleteProductModal = ({ isOpen, onClose, productId, productTitle }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteProduct(productId));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Product">
      <p>Are you sure you want to delete the product: {`"${productTitle}"`}?</p>
      <div className="flex justify-end space-x-4">
        <Button
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-600 mt-4"
        >
          Cancel
        </Button>
        <button
          onClick={handleDelete}
          className="py-2 px-4 mt-4 rounded transition-colors text-white bg-red-500 hover:bg-white hover:text-red-500"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteProductModal;
