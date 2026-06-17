import { useFolders } from "../../../data/folders/useFolders";
import { useTasks } from "../../../data/tasks/useTasks";
import TaskItem from "./TaskItem";
import { useSearchParams } from "react-router";

function TaskList() {
  let [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const { tasks } = useTasks();

  const filteredTasks = tasks.filter(
    (task) =>
      task.note.toLowerCase().includes(query.toLowerCase()) ||
      task.title.toLowerCase().includes(query.toLowerCase()),
  );
  // console.log("filteredTasks", filteredTasks, query);

  const { folders } = useFolders();

  return (
    <ul className="mt-5 flex flex-col gap-5">
      {filteredTasks.map((task) => (
        <TaskItem task={task} folders={folders} key={task.id} />
      ))}
    </ul>
  );
}

export default TaskList;
