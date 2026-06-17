import { Pencil, SquareCheck, Trash2 } from "lucide-react";
import ModalBox from "../../../components/modal/ModalBox";
import { useModalState } from "../../../components/modal/ModalStateContext";
import useUpdateTask from "../../../data/tasks/useUpdateTask";
import useDeleteTask from "../../../data/tasks/useDeleteTask";
import ActionButton from "../../../components/button/ActionButton";
import NewTaskItem from "../new-task-item/NewTaskItem";
import { useState } from "react";

function TaskActions({ task }) {
  // "actions", "edit"
  const [content, setContent] = useState("actions");

  const { updateTaskMutate } = useUpdateTask();
  const { deleteTaskMutate } = useDeleteTask();

  const { closeModal } = useModalState();

  function handleEditClick() {
    setContent("edit");
  }

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
      {content === "actions" && (
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
      )}
      {content === "edit" && (
        <NewTaskItem task={task} closeModal={closeModal} />
      )}
    </ModalBox>
  );
}

export default TaskActions;
