import { createContext, useContext } from "react";

const UiStateContext = createContext();

function useUiState() {
  const uiState = useContext(UiStateContext);

  if (!uiState) {
    throw new Error("context is used outside provider");
  }

  return uiState;
}

export { useUiState, UiStateContext };
