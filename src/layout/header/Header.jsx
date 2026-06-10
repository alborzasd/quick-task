import { ChevronLeft, MenuIcon, Search } from "lucide-react";

import HeaderButtonIcon from "../../components/button/HeaderButtonIcon";
import useSearchbar from "./useSearchbar";
import Searchbar from "./Searchbar";
import { useUiState } from "../../providers/ui-state-provider/UiStateContext";

function Header() {
  const { isSearchOpen, toggleSearchbar } = useSearchbar();
  const { openSidebar } = useUiState();

  return (
    <header
      className="flex h-16 gap-3 items-center justify-between bg-gray-50 px-3
        py-3 text-blue-900 shadow-sm"
    >
      <HeaderButtonIcon onClick={openSidebar}>
        <MenuIcon />
      </HeaderButtonIcon>
      {isSearchOpen ? (
        <Searchbar />
      ) : (
        <h1 className="text-lg py-2">QuickTask 📝</h1>
      )}
      <HeaderButtonIcon onClick={toggleSearchbar}>
        {isSearchOpen ? <ChevronLeft /> : <Search />}
      </HeaderButtonIcon>
    </header>
  );
}

export default Header;
