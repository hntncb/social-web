export const Form = ({
    children,
    onSubmit,
    className
}) => {
    return(
        <form 
        onSubmit={onSubmit}
        className={`[&_input]:border [&_input]:rounded-lg bg-auto ${className}`}
        >
            {children}
        </form>
    )
}