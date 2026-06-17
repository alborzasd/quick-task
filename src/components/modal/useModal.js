import { useCallback } from "react";
import usePreventScroll from "../../hooks/usePreventScroll";
import { useLocation, useNavigate } from "react-router";

// this hook is used by the modal's parent
function useModal(label) {
  const location = useLocation();
  const navigate = useNavigate();

  const isModalOpen = location?.state?.openModal === label;

  const openModal = useCallback(() => {
    navigate(
      { pathname: location.pathname, search: location.search },
      { state: { ...location.state, openModal: label } },
    );
  }, [location, navigate, label]);

  const closeModal = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // usePreventScroll(isModalOpen);

  return { isModalOpen, openModal, closeModal };
}

export default useModal;
