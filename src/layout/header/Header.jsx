import { ChevronLeft, MenuIcon, Search } from "lucide-react";

import ButtonIcon from "../../components/button/ButtonIcon";
import useSearchbar from "./useSearchbar";
import Searchbar from "./Searchbar";
import useSidebar from "../sidebar/useSidebar";

function Header() {
  const { isSearchOpen, toggleSearchbar } = useSearchbar();

  const { openSidebar } = useSidebar();

  return (
    <header
      className="flex h-16 gap-3 items-center justify-between bg-gray-50 px-3
        py-3 text-blue-900 shadow-sm"
    >
      <ButtonIcon onClick={openSidebar}>
        <MenuIcon />
      </ButtonIcon>
      {isSearchOpen ? (
        <Searchbar />
      ) : (
        <h1 className="text-lg py-2">QuickTask 📝</h1>
      )}
      <ButtonIcon onClick={toggleSearchbar}>
        {isSearchOpen ? <ChevronLeft /> : <Search />}
      </ButtonIcon>
    </header>
  );
}

export default Header;
