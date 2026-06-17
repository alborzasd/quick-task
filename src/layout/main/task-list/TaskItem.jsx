import { EllipsisVertical, FolderClosed, SquareCheck } from "lucide-react";
import ButtonIcon from "../../../components/button/ButtonIcon";
import useModal from "../../../components/modal/useModal";
import Modal from "../../../components/modal/Modal";
import TaskActions from "./TaskActions";

function TaskItem({ task, folders }) {
  const { isModalOpen, openModal, closeModal } = useModal(
    `task-actions-${task.id}`,
  );

  const folderName = folders.find(
    (folder) => task.folderId === folder.id,
  )?.name;

  return (
    <>
      <li className="rounded-md bg-white border shadow-sm flex flex-col">
        <div className="px-2">
          {task?.title && (
            <p className="font-medium text-lg text-gray-700 px-1 py-2">
              {task.title}
            </p>
          )}
          <p className="px-1 py-2 [font-family:inherit] wrap-anywhere">{task.note}</p>
        </div>
        <div className="flex p-1 pl-2 gap-1 items-center">
          <div
            className="flex items-center gap-1 bg-yellow-100 text-gray-600
              rounded-md px-2 py-1 text-sm"
          >
            <FolderClosed size={20} />
            <span>{folderName}</span>
          </div>
          {task?.isDone && (
            <div
              className="flex items-center gap-1 bg-green-100 text-gray-600
                rounded-md px-2 py-1 text-sm"
            >
              <SquareCheck size={20} />
              <span>Done</span>
            </div>
          )}
          <div className="ml-auto">
            <ButtonIcon onClick={openModal}>
              <EllipsisVertical size={22} />
            </ButtonIcon>
          </div>
        </div>
      </li>
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <TaskActions task={task} />
        </Modal>
      )}
    </>
  );
}

export default TaskItem;
