import { useEffect } from "react";

// TODO: find style attributes to change scrollbar behavior
// so it doest't shirnk the width of body (layout shift)
// should work on all browsers
function usePreventScroll(isOpen) {
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);
}

export default usePreventScroll;
