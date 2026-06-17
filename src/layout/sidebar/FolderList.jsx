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
  return (
    <ModalBox title="Folder Actions">
      <ul className="overflow-auto">
        <ActionButton>
          <Pencil size={18} />
          <span>Edit</span>
        </ActionButton>
        <ActionButton>
          <Trash2 size={18} />
          <span>Delete</span>
        </ActionButton>
        {!folder.isDefault && (
          <ActionButton>
            <BadgeCheck size={18} />
            <span>Set as default</span>
          </ActionButton>
        )}
      </ul>
    </ModalBox>
  );
}

export default FolderList;
