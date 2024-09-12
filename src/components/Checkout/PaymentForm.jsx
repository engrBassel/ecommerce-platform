import { Field, ErrorMessage } from "formik";

const PaymentForm = () => {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="cardNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Card Number
        </label>
        <Field
          type="text"
          id="cardNumber"
          name="cardNumber"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
        />
        <ErrorMessage
          name="cardNumber"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <label
          htmlFor="expirationDate"
          className="block text-sm font-medium text-gray-700"
        >
          Expiration Date (MM/YY)
        </label>
        <Field
          type="text"
          id="expirationDate"
          name="expirationDate"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
        />
        <ErrorMessage
          name="expirationDate"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <label
          htmlFor="cvv"
          className="block text-sm font-medium text-gray-700"
        >
          CVV
        </label>
        <Field
          type="text"
          id="cvv"
          name="cvv"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
        />
        <ErrorMessage
          name="cvv"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    </div>
  );
};

export default PaymentForm;
