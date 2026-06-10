import { useEffect, useState } from "react";
import { SendHorizonalIcon, FolderClosedIcon, ChevronDown } from "lucide-react";
import useModal from "../../../components/modal/useModal";
import Modal from "../../../components/modal/Modal";
import FolderSelector from "./FolderSelector";
import { useFolders } from "../../../data/folders/useFolders";
import { toast } from "sonner";

// helper logic
function getFolderName(folders, isPending, error, selectedId) {
  if (!isPending && !error) {
    if (selectedId) {
      return folders.find((f) => f.id === selectedId)?.name;
    } else {
      return folders.find((f) => f.isDefault)?.name;
    }
  } else {
    return null;
  }
}

function NewTaskItem() {
  const {
    folders,
    error: errorFolderLoading,
    isPending: isFolderPending,
  } = useFolders();

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  // null means data is not loaded yet
  // or if it's loaded, then choose the default folder
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  // derived state
  const selectedFolderName = getFolderName(
    folders,
    isFolderPending,
    errorFolderLoading,
    selectedFolderId,
  );

  const { isModalOpen, openModal, closeModal } = useModal(false);

  useEffect(() => {
    const message =
      "Error! Couldn't load folders: " + errorFolderLoading?.message;
    if (errorFolderLoading) {
      console.error(message);
      toast.error(message, { duration: Infinity });
    }
  }, [errorFolderLoading]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleFolderClick(e) {
    e.preventDefault();
    openModal();
  }

  return (
    <>
      <form className="rounded-md bg-white border shadow-sm flex flex-col">
        <div className="px-2">
          <input
            value={title}
            onChange={(e) => setTitle(e?.target?.value)}
            type="text"
            placeholder="Title (optional)"
            className="rounded-t-md border-b w-full text-xl px-1 py-2
              focus:outline-none"
          />
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Note"
            className="min-h-[12rem] w-full flex-1 px-1 py-2 focus:outline-none
              resize-none [field-sizing:content]"
          />
        </div>
        <div className="flex border-t px-1 py-1 gap-2">
          <FolderSelectorButton
            isFolderPending={isFolderPending}
            selectedId={selectedFolderId}
            selectedName={selectedFolderName}
            errorFolderLoading={errorFolderLoading}
            onClick={handleFolderClick}
          />
          <button
            onClick={handleSubmit}
            className="text-gray-50 bg-blue-500 rounded-md px-2 py-2
              hover:bg-blue-700 transition disabled:bg-blue-300
              disabled:cursor-not-allowed"
            disabled={note === "" || isFolderPending || errorFolderLoading}
          >
            <SendHorizonalIcon />
          </button>
        </div>
      </form>
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <FolderSelector
            selectedId={selectedFolderId}
            setSelectedId={setSelectedFolderId}
          />
        </Modal>
      )}
    </>
  );
}

function FolderSelectorButton({
  onClick,
  selectedName,
  selectedId,
  isFolderPending,
  errorFolderLoading,
}) {
  const disabled =
    isFolderPending ||
    errorFolderLoading ||
    (!isFolderPending && !errorFolderLoading && !selectedName);

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="flex-1 flex items-center gap-1 bg-yellow-100 text-gray-600
        rounded-md px-1 text-left hover:bg-yellow-200 disabled:bg-yellow-100
        transition disabled:cursor-not-allowed"
    >
      <FolderClosedIcon />
      <span className="flex-1">
        {isFolderPending
          ? "loading folders..."
          : errorFolderLoading
            ? "Error! Couldn't load folders"
            : disabled
              ? `FolderId {${selectedId}} not found!`
              : selectedName}
      </span>
      <ChevronDown />
    </button>
  );
}

export default NewTaskItem;
