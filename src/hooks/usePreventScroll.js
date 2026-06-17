import { useEffect } from "react";

// TODO: find style attributes to change scrollbar behavior
// so it doest't shirnk the width of body (layout shift)
// should work on all browsers
function usePreventScroll(isOpen) {
  // console.log("isOpen", isOpen);
  useEffect(() => {
    if (!isOpen) return;

    // don't store prevOverflow, it will cause a bug on closing sidebar
    // just unset the value so it can follow the css style
    // const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      // document.body.style.overflow = prevOverflow;
      document.body.style.overflow = "";
    };
  }, [isOpen]);
}

export default usePreventScroll;
