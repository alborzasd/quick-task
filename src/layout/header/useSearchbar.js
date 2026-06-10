import { useState, useCallback } from "react";
import useCloseOnBack from "../../hooks/useCloseOnBack";

function useSearchbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearchbar = useCallback(
    () => setIsSearchOpen((isOpen) => !isOpen),
    [],
  );

  const closeSearchbar = useCallback(() => setIsSearchOpen(false), []);

  useCloseOnBack(isSearchOpen, closeSearchbar, "Searchbar");

  return { isSearchOpen, toggleSearchbar };
}

export default useSearchbar;
