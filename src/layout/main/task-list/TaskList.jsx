import { useFolders } from "../../../data/folders/useFolders";
import { useTasks } from "../../../data/tasks/useTasks";
import TaskItem from "./TaskItem";

function TaskList() {
  const { tasks } = useTasks();
  const { folders } = useFolders();

  return (
    <ul className="mt-5 flex flex-col gap-5">
      {tasks.map((task) => (
        <TaskItem task={task} folders={folders} key={task.id} />
      ))}
    </ul>
  );
}

export default TaskList;
