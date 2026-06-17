import { Pencil, SquareCheck, Trash2 } from "lucide-react";
import ModalBox from "../../../components/modal/ModalBox";
import { useModalState } from "../../../components/modal/ModalStateContext";
import useUpdateTask from "../../../data/tasks/useUpdateTask";
import useDeleteTask from "../../../data/tasks/useDeleteTask";

function TaskActions({ task }) {
  const { updateTaskMutate } = useUpdateTask();
  const { deleteTaskMutate } = useDeleteTask();

  const { closeModal } = useModalState();

  function handleEditClick() {}

  function handleDeleteClick() {
    deleteTaskMutate({ id: task.id });
    closeModal();
  }

  function handleToggleClick() {
    // updateTask(task.id, { isDone: !task.isDone });
    updateTaskMutate({ id: task.id, updatedTask: { isDone: !task.isDone } });
    closeModal();
  }

  return (
    <ModalBox title="Task Actions">
      <ul className="overflow-auto">
        <ActionButton onClick={handleEditClick}>
          <Pencil size={18} />
          <span>Edit</span>
        </ActionButton>
        <ActionButton onClick={handleDeleteClick}>
          <Trash2 size={18} />
          <span>Delete</span>
        </ActionButton>
        <ActionButton onClick={handleToggleClick}>
          <SquareCheck size={18} />
          <span>{task.isDone ? "Mark as undone" : "Mark as done"}</span>
        </ActionButton>
      </ul>
    </ModalBox>
  );
}

function ActionButton({ children, ...props }) {
  return (
    <li>
      <button
        className="flex items-center gap-1 hover:bg-blue-100 px-1 py-1
          rounded-md text-left transition w-full wrap-anywhere"
        {...props}
      >
        {children}
      </button>
    </li>
  );
}

export default TaskActions;
