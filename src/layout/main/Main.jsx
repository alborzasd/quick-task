import NewTaskItem from "./new-task-item/NewTaskItem";
import TaskList from "./task-list/TaskList";

function Main() {
  return (
    <main className="px-3 py-5 max-w-3xl m-auto">
      <NewTaskItem/>
      <TaskList />
    </main>
  );
}

export default Main;