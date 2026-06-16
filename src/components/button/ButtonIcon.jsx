function ButtonIcon({ children, ...props }) {
  return (
    <button
      className="rounded-md border-2 border-transparent px-1 py-1
        transition-colors [&:is(:hover,:focus,:active)]:border-blue-300"
      {...props}
    >
      {children}
    </button>
  );
}

export default ButtonIcon;
