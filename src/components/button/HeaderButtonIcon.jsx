function HeaderButtonIcon({ children, ...props }) {
  return (
    <button
      {...props}
      className="rounded-md border-2 border-transparent px-1 py-1
        transition-colors [&:is(:hover,:focus,:active)]:border-blue-300"
    >
      {children}
    </button>
  );
}

export default HeaderButtonIcon;