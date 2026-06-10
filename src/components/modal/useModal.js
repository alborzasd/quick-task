import {useState, useCallback} from "react";
import useCloseOnBack from "../../hooks/useCloseOnBack";
import usePreventScroll from "../../hooks/usePreventScroll";

// this hook is used by the modal's parent
function useModal(initialState) {
  const [isModalOpen, setIsModalOpen] = useState(initialState);
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  useCloseOnBack(isModalOpen, closeModal, "Modal");
  usePreventScroll(isModalOpen);

  return {isModalOpen, openModal, closeModal};
}

export default useModal;
