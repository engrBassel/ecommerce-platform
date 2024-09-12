import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { editProduct } from "../../state/productsSlice";

const EditProductModal = ({ isOpen, onClose, product }) => {
  const dispatch = useDispatch();

  const initialValues = {
    title: product.title,
    image: product.image,
    price: product.price,
    description: product.description,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Product title is required"),
    image: Yup.string()
      .url("Invalid image URL")
      .required("Product image URL is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    description: Yup.string().required("Description is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    const updatedProduct = {
      ...product,
      ...values,
    };
    dispatch(editProduct(updatedProduct));
    setSubmitting(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Product">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Product Title
              </label>
              <Field
                type="text"
                name="title"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <Field
                type="text"
                name="image"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <Field
                type="number"
                name="price"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <Field
                as="textarea"
                name="description"
                rows="4"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 min-h-16 max-h-36"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-600"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditProductModal;
