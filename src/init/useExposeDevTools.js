import { useEffect } from "react";

function useExposeDevTools() {
  useEffect(() => {
    if(!import.meta.env.DEV) return;

    window.dev = null;

    import("../dev/dbDevTools").then((dbDevTools) => {
      window.dev = dbDevTools.default;
    });
  }, []);
}

export default useExposeDevTools;