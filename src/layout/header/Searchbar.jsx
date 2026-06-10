import { useEffect, useRef } from "react";

function Searchbar() {
  let inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form className="flex-1">
      <input
        ref={inputRef}
        className="w-full px-1 py-2 border-2 rounded-md border-blue-300"
        type="text"
        placeholder="Search..."
      />
    </form>
  );
}

export default Searchbar;