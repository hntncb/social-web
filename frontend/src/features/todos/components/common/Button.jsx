export const Button = ({
    children,
    type='button',
    onClick,
    loading = false,
    className='border bg-blue-200'
}) => {
    return(
        <button
            type={type}
            onClick={onClick}
            className={className}
            >
            {loading ? 'Đang xử lý...' : children}
        </button>
    );
}