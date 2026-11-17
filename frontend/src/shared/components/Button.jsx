export const Button = ({
    children,
    type='button',
    onClick,
    loading = false,
    disabled = loading,
    className=''
}) => {
    return(
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`border rounded-sm bg-blue-100 cursor-pointer flex justify-center items-center text-center ${className}`}
            >
            {loading ? 'Đang xử lý...' : children}
        </button>
    );
}