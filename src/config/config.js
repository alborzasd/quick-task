export const config = {
  appName: import.meta.env.VITE_APP_NAME,
  dbVersion: Number(import.meta.env.VITE_INDEXED_DB_VERSION) || 1,
  defaultFolderName: import.meta.env.VITE_DEFAULT_FOLDER_NAME,

  zIndex: {
    sidebar: 50,
    modal: 100,
  }
};
