import { createContext, useContext } from "react";

const ModalStateContext = createContext();

function useModalState() {
  const modalState = useContext(ModalStateContext);

  if (!modalState) {
    throw new Error("context is used outside provider");
  }

  return modalState;
}

export { useModalState, ModalStateContext };