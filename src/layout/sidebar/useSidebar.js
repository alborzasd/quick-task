import { useNavigate, useLocation } from "react-router";
import usePreventScroll from "../../hooks/usePreventScroll";
import { useCallback } from "react";

function useSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isSidebarOpen = location?.state?.isSidebarOpen === true;

  const openSidebar = useCallback(() => {
    navigate(
      { pathname: location.pathname, search: location.search },
      { state: { ...location.state, isSidebarOpen: true } },
    );
  }, [location, navigate,]);

  const closeSidebar = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // usePreventScroll(isSidebarOpen);

  return { isSidebarOpen, openSidebar, closeSidebar };
}

export default useSidebar;
