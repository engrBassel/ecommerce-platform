const Button = ({
  type = "button",
  onClick,
  children,
  className,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-2 px-4 rounded transition-colors ${className} ${
        disabled
          ? "bg-gray-500 text-white cursor-not-allowed"
          : "bg-dark-green text-white hover:bg-light-green hover:text-dark-green"
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
