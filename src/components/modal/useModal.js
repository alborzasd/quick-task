import { useCallback } from "react";
import usePreventScroll from "../../hooks/usePreventScroll";
import { useLocation, useNavigate } from "react-router";

// this hook is used by the modal's parent
function useModal(label) {
  const location = useLocation();
  const navigate = useNavigate();

  // const isModalOpen = location?.state?.openModal === label;
  const isModalOpen = location?.state?.openModal.includes(label);

  const openModal = useCallback(() => {
    // console.log("navigate", label);
    const stateValue = {...location.state};
    if(stateValue?.openModal) {
      stateValue.openModal = [...stateValue.openModal, label];
    } else {
      stateValue.openModal = [];
    }
    navigate(
      { pathname: location.pathname, search: location.search },
      // { state: { ...location.state, openModal: label } },
      { state: stateValue },
    );
  }, [location, navigate, label]);

  const closeModal = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // usePreventScroll(isModalOpen);

  return { isModalOpen, openModal, closeModal };
}

export default useModal;
