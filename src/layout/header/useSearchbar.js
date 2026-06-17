import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";

function useSearchbar() {
  const location = useLocation();
  const isSearchOpen = location?.state?.isSearchOpen === true;

  const navigate = useNavigate();

  const toggleSearchbar = useCallback(() => {
    if (isSearchOpen) {
      navigate(-1);
    } else {
      navigate(
        { pathname: location.pathname, search: location.search },
        { state: { ...location.state, isSearchOpen: true } },
      );
    }
  }, [location, navigate, isSearchOpen]);

  return { isSearchOpen, toggleSearchbar };
}

export default useSearchbar;
