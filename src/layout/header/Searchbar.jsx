import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";

function Searchbar() {
  let inputRef = useRef(null);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const query = inputRef?.current?.value;

    setSearchParams(query ? { q: query } : {}); 
  }

  return (
    <form className="flex-1" onSubmit={handleSubmit}>
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