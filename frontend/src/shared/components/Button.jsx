export const Button = ({
  children,
  type = 'button',
  onClick,
  loading = false,
  disabled = loading,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex cursor-pointer items-center justify-center rounded-sm border bg-blue-100 text-center ${className}`}
    >
      {loading ? 'Đang xử lý...' : children}
    </button>
  );
};
