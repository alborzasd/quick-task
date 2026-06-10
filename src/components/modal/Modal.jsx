import { useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { config } from "../../config/config";
import { ModalStateContext } from "./ModalStateContext";

function Modal({ children, closeModal }) {
  const overlayRef = useRef(null);

  function handleClose(e) {
    // only close if target is the overlay itself, not its children
    if (e?.target === overlayRef?.current) {
      closeModal();
    }
  }

  const contextValue = useMemo(() => {
    return {
      closeModal,
    };
  }, [closeModal]);

  return createPortal(
    <ModalStateContext.Provider value={contextValue}>
      <div
        ref={overlayRef}
        className={`fixed inset-0 flex justify-center items-center bg-black/40
          overscroll-contain`}
        style={{ zIndex: config.zIndex.modal }}
        onClick={handleClose}
      >
        {children}
      </div>
    </ModalStateContext.Provider>,
    document.body,
  );
}

export default Modal;
