export const Form = ({ children, onSubmit, className }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`bg-auto [&_input]:rounded-sm [&_input]:border [&_textarea]:rounded-sm [&_textarea]:border ${className}`}
    >
      {children}
    </form>
  );
};
