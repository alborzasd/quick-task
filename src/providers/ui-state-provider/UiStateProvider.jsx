import { useMemo, useState, useCallback } from "react";
import { UiStateContext } from "./UiStateContext";

function UiStateProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  // without useMemo
  // the object reference passed to the value prop
  // will change every time if parent of this component re-renders
  const contextValue = useMemo(() => {
    return {
      isSidebarOpen,
      openSidebar,
      closeSidebar,
    };
  }, [isSidebarOpen, openSidebar, closeSidebar]);

  return (
    <UiStateContext.Provider value={contextValue}>
      {children}
    </UiStateContext.Provider>
  );
}

export default UiStateProvider;
