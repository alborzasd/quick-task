import { useEffect } from "react";
import useCreateDefaultFolder from "./useCreateDefaultFolder";
import useExposeDevTools from "./useExposeDevTools";

function AppInitializer({ children }) {
  const { createDefaultFolder } = useCreateDefaultFolder();

  useEffect(() => {
    createDefaultFolder();
  }, [createDefaultFolder]);

  useExposeDevTools();

  return children;
}

export default AppInitializer;
