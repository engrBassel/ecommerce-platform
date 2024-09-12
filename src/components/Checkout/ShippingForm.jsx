import { Field, ErrorMessage } from "formik";

const ShippingForm = () => {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          Address
        </label>
        <Field
          type="text"
          id="address"
          name="address"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
        />
        <ErrorMessage
          name="address"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700"
        >
          City
        </label>
        <Field
          type="text"
          id="city"
          name="city"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
        />
        <ErrorMessage
          name="city"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    </div>
  );
};

export default ShippingForm;
