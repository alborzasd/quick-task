import {
  BadgeCheck,
  EllipsisVertical,
  FolderClosedIcon,
  Pencil,
  Trash2,
} from "lucide-react";
import { useFolders } from "../../data/folders/useFolders";
import ButtonIcon from "../../components/button/ButtonIcon";
import useModal from "../../components/modal/useModal";
import Modal from "../../components/modal/Modal";
import ModalBox from "../../components/modal/ModalBox";
import ActionButton from "../../components/button/ActionButton";
import { useModalState } from "../../components/modal/ModalStateContext";
import useUpdateFolder from "../../data/folders/useUpdateFolder";
import useDeleteFolder from "../../data/folders/useDeleteFolder";
import { useState } from "react";

function FolderList() {
  const { folders, isPending, error } = useFolders();

  return (
    <nav className="py-4 px-2">
      <ul>
        {folders.map((folder) => (
          <FolderItem folder={folder} key={folder.id} />
        ))}
      </ul>
    </nav>
  );
}

function FolderItem({ folder }) {
  const { isModalOpen, openModal, closeModal } = useModal(
    `folder-actions-${folder.id}`,
  );

  return (
    <>
      <li>
        <a
          className="flex gap-1 hover:bg-yellow-100 px-1 py-1 rounded-md
            transition cursor-pointer items-center wrap-anywhere"
        >
          <span className="shrink-0 self-start py-1">
            <FolderClosedIcon />
          </span>
          <span className="mr-auto">
            {folder.name + " "}
            {folder.isDefault && (
              <span
                className="text-xs tracking-wider text-white bg-blue-400 p-1
                  rounded-md"
              >
                default
              </span>
            )}
          </span>
          <ButtonIcon onClick={openModal}>
            <EllipsisVertical size={20} className="text-gray-700" />
          </ButtonIcon>
        </a>
      </li>
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <FolderActions folder={folder} />
        </Modal>
      )}
    </>
  );
}

function FolderActions({ folder }) {
  // "actions", "edit", "confirmDelete"
  const [content, setContent] = useState("actions");

  const { updateFolderMutate } = useUpdateFolder();

  const { closeModal } = useModalState();

  function handleEditClick() {
    setContent("edit");
  }

  function handleDeleteClick() {
    setContent("confirmDelete");
  }

  function handleSetDefaultClick() {
    updateFolderMutate({ id: folder.id, updatedFolder: { isDefault: true } });
    closeModal();
  }

  return (
    <ModalBox title="Folder Actions">
      {content === "actions" && (
        <ul className="overflow-auto">
          <ActionButton onClick={handleEditClick}>
            <Pencil size={18} />
            <span>Edit</span>
          </ActionButton>
          {!folder.isDefault && (
            <ActionButton onClick={handleDeleteClick}>
              <Trash2 size={18} />
              <span>Delete</span>
            </ActionButton>
          )}
          {!folder.isDefault && (
            <ActionButton onClick={handleSetDefaultClick}>
              <BadgeCheck size={18} />
              <span>Set as default</span>
            </ActionButton>
          )}
        </ul>
      )}
      {content === "edit" && (
        <FolderEdit folder={folder} closeModal={closeModal} />
      )}
      {content === "confirmDelete" && (
        <FolderDelete folder={folder} closeModal={closeModal} />
      )}
    </ModalBox>
  );
}

function FolderEdit({ folder, closeModal }) {
  const { updateFolderMutate } = useUpdateFolder();

  const [folderName, setFolderName] = useState(folder.name);

  function handleSubmit(e) {
    e.preventDefault();
    if (!folderName) return;

    updateFolderMutate({ id: folder.id, updatedFolder: { name: folderName } });
    setFolderName("");
    closeModal();
  }
  return (
    <form className="px-1 flex gap-2 text-md">
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
        <Pencil size={26} />
      </button>
    </form>
  );
}

function FolderDelete({ folder, closeModal }) {
  const { deleteFolderMutate } = useDeleteFolder();

  function handleDeleteClick() {
    deleteFolderMutate({ id: folder.id });
    closeModal();
  }

  return (
    <div className="flex flex-col items-center gap-5 text-lg">
      <p>
        By deleting the folder "{folder.name}", All tasks related to it will be
        deleted.
      </p>
      <button
        className="bg-red-400 hover:bg-red-500 transition text-white rounded-md
          py-2 px-6"
          onClick={handleDeleteClick}
      >
        Delete
      </button>
    </div>
  );
}

export default FolderList;
