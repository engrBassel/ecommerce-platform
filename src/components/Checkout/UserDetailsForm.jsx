import { Field, ErrorMessage } from "formik";

const UserDetailsForm = () => {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          First Name
        </label>
        <Field
          type="text"
          id="firstName"
          name="firstName"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
        />
        <ErrorMessage
          name="firstName"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name
        </label>
        <Field
          type="text"
          id="lastName"
          name="lastName"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
        />
        <ErrorMessage
          name="lastName"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <Field
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
        />
        <ErrorMessage
          name="email"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    </div>
  );
};

export default UserDetailsForm;
