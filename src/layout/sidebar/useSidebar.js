import usePreventScroll from "../../hooks/usePreventScroll";

function useSidebar(isSidebarOpen, closeSidebar) {
  usePreventScroll(isSidebarOpen);
}

export default useSidebar;
