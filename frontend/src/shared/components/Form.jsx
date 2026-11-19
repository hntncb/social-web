export const Form = ({
    children,
    onSubmit,
    className
}) => {
    return(
        <form 
        onSubmit={onSubmit}
        className={`[&_input]:border [&_input]:rounded-sm [&_textarea]:border [&_textarea]:rounded-sm bg-auto ${className}`}
        >
            {children}
        </form>
    )
}