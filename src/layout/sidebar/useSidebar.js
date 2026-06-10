import usePreventScroll from "../../hooks/usePreventScroll";
import useCloseOnBack from "../../hooks/useCloseOnBack";

function useSidebar(isSidebarOpen, closeSidebar) {
  useCloseOnBack(isSidebarOpen, closeSidebar, "Sidebar");
  usePreventScroll(isSidebarOpen);
}

export default useSidebar;
