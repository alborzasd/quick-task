function ActionButton({ children, ...props }) {
  return (
    <li>
      <button
        className="flex items-center gap-1 hover:bg-blue-100 px-1 py-1
          rounded-md text-left transition w-full wrap-anywhere"
        {...props}
      >
        {children}
      </button>
    </li>
  );
}

export default ActionButton;