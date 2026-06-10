import { useEffect } from "react";

// global mutable history tracker
const historyStack = [];

// by clicking on the back button on mobile phones, component will be closed
function useCloseOnBack(isOpen, close, label) {
  useEffect(() => {
    if (!isOpen) return;

    // push fake history entry
    // (label is for tracking component name in window.history)
    const state = { [label]: true };
    window.history.pushState(state, "");
    historyStack.push(state);

    function handleClose() {
      // only close component if 'open [label]' was the last action
      // for example: 'open searchbar' then 'open sidebar'
      // => clicking on back-button should close sidebar
      // => the next clicking on back-button now closes the searchbar
      if (historyStack.at(-1) === state) {
        close();
        historyStack.pop();
        // we dont need handler anymore
        window.removeEventListener("popstate", handleClose);
      }
    }

    window.addEventListener("popstate", handleClose);

    return () => {
      // clear history if component is closed in other ways
      // (not by pressing back button)
      if (historyStack.at(-1) === state) {
        // call the handler (pop from historyStack, then remove handler)
        // the close() call inside handler will be ignored (already closed)
        window.history.back();
        // DO NOT POP HISTORY STACK HERE !
        // becuse it will be called before handlers
        // scenario: open searchbar, then open sidebar
        // if sidebar is closed by clicking outside.
        // then searchbar will also be closed!
        // because now we have 2 active handlers (searchbar, sidebar)
        // each of them will run and check the historyStack
        // searchbar handler runs after the historyStack is popped
        // so stack inside handler has {searchBar: true} as the last element
      }
    };
  }, [isOpen, close, label]);
}

export default useCloseOnBack;
