import {useState, useCallback} from "react";
import usePreventScroll from "../../hooks/usePreventScroll";

// this hook is used by the modal's parent
function useModal(initialState) {
  const [isModalOpen, setIsModalOpen] = useState(initialState);
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  usePreventScroll(isModalOpen);

  return {isModalOpen, openModal, closeModal};
}

export default useModal;
