import { useState, useCallback } from "react";

function useSearchbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearchbar = useCallback(
    () => setIsSearchOpen((isOpen) => !isOpen),
    [],
  );

  const closeSearchbar = useCallback(() => setIsSearchOpen(false), []);

  return { isSearchOpen, toggleSearchbar };
}

export default useSearchbar;
