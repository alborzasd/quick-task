import { FolderClosedIcon } from "lucide-react";
import ModalBox from "../../../components/modal/ModalBox";
import { useFolders } from "../../../data/folders/useFolders";
import { useModalState } from "../../../components/modal/ModalStateContext";

function FolderSelector({ selectedId, setSelectedId }) {
  const { folders } = useFolders();
  const { closeModal } = useModalState();

  return (
    <ModalBox title={"Select Folder"}>
      <ul className="overflow-auto" role="listbox">
        {folders.map((folder) => (
          <FolderItem
            folder={folder}
            key={folder.id}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            closeModal={closeModal}
          />
        ))}
      </ul>
    </ModalBox>
  );
}

function FolderItem({ folder, selectedId, setSelectedId, closeModal }) {
  const isSelected =
    selectedId === folder.id ||
    (selectedId === null && folder.isDefault === true);

  function handleClick() {
    setSelectedId(folder.id);
    closeModal?.();
  }

  return (
    <li>
      <button
        onClick={handleClick}
        role="option"
        className={`flex gap-1 hover:bg-yellow-100 px-1 py-1 rounded-md
          text-left transition w-full wrap-anywhere
          ${isSelected ? "bg-yellow-100 font-semibold" : ""}`}
      >
        <FolderClosedIcon className="shrink-0 self-start" />
        <span>{folder.name}</span>
      </button>
    </li>
  );
}

export default FolderSelector;
