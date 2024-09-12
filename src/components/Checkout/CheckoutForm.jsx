import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import UserDetailsForm from "./UserDetailsForm";
import ShippingForm from "./ShippingForm";
import PaymentForm from "./PaymentForm";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../state/orderHistorySlice";
import { getCurrDate } from "../../utils/getCurrDate";
import Modal from "../UI/Modal";
import { clearCart } from "../../state/cartSlice";

const CheckoutForm = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = useSelector((state) => state.cart.total);
  const [step, setStep] = useState(1);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  };

  const validationSchema = [
    Yup.object().shape({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    }),
    Yup.object().shape({
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
    }),
    Yup.object().shape({
      cardNumber: Yup.string()
        .required("Card Number is required")
        .matches(/^[0-9]{16}$/, "Card Number must be 16 digits"),
      expirationDate: Yup.string()
        .required("Expiration Date is required")
        .matches(
          /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
          "Expiration Date must be MM/YY"
        ),
      cvv: Yup.string()
        .required("CVV is required")
        .matches(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits"),
    }),
  ];

  const handleSubmit = (_, { setSubmitting, resetForm }) => {
    if (step < 3) {
      setStep(step + 1);
      setSubmitting(false);
    } else {
      dispatch(
        addOrder({
          id: Date.now(),
          orderDate: getCurrDate(),
          products: cartItems,
          total: cartTotal,
        })
      );
      setIsSuccessOpen(true);
      setTimeout(() => {
        resetForm();
        setSubmitting(false);
        setIsSuccessOpen(false);
        dispatch(clearCart());
        navigate("/ecommerce-platform");
      }, 3000);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <UserDetailsForm />;
      case 2:
        return <ShippingForm />;
      case 3:
        return <PaymentForm />;
      default:
        return <UserDetailsForm />;
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema[step - 1]}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            {renderStepContent()}

            <div className="flex justify-between">
              {step > 1 && (
                <Button
                  className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
                  onClick={handlePrevious}
                >
                  Back
                </Button>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                className={step === 1 ? "block ml-auto" : ""}
              >
                {isSubmitting
                  ? "Submitting..."
                  : step === 3
                  ? "Submit Order"
                  : "Continue"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <Modal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title="Order Submitted"
      >
        <p>Your order has been submitted successfully</p>
      </Modal>
    </div>
  );
};

export default CheckoutForm;
