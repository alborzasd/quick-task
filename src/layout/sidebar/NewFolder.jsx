import { Plus } from "lucide-react";
import { useState } from "react";
import useCreateFolder from "../../data/folders/useCreateFolder";

function NewFolder() {
  const { createFolderMutate } = useCreateFolder();

  const [folderName, setFolderName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!folderName) return;

    createFolderMutate({ name: folderName });
    setFolderName("");
  }

  return (
    <form className="px-3 flex gap-2 text-sm">
      <input
        className="border-2 border-blue-300 rounded-md p-1 flex-1"
        type="text"
        value={folderName}
        placeholder="New Folder"
        onChange={(e) => setFolderName(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={!folderName}
        className="text-gray-50 bg-blue-500 rounded-md p-1 hover:bg-blue-700
          transition disabled:bg-blue-300 disabled:cursor-not-allowed"
      >
        <Plus />
      </button>
    </form>
  );
}

export default NewFolder;
