import useSidebar from "./useSidebar";
import { useUiState } from "../../providers/ui-state-provider/UiStateContext";
import { config } from "../../config/config";
import FolderList from "./FolderList";
import ButtonIcon from "../../components/button/ButtonIcon";
import { ChevronLeft } from "lucide-react";

function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useUiState();

  useSidebar(isSidebarOpen, closeSidebar);

  return (
    <>
      <div
        onClick={closeSidebar}
        className={`fixed inset-0 bg-black/40 transition-opacity
          ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      ></div>
      <aside
        className={`fixed top-0 left-0 h-screen w-72 bg-white transform
          transition-transform duration-300
          ${isSidebarOpen ? "shadow-lg translate-x-0" : "-translate-x-full"}`}
        style={{ zIndex: config.zIndex.sidebar }}
      >
        <header
          className="flex items-center border-b h-16 mx-2 justify-between
            text-blue-900"
        >
          <h2 className="text-2xl">Folders</h2>
          <ButtonIcon onClick={closeSidebar}>
            <ChevronLeft />
          </ButtonIcon>
        </header>
        <FolderList />
      </aside>
    </>
  );
}

export default Sidebar;
