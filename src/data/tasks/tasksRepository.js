import { db } from "../db";

export async function getTasks() {
  return db.tasks.orderby("id").toArray();
}

export async function createTask(newTask) {
  if (!newTask.note) {
    throw new Error("Task note can not be empty.");
  }

  if (!newTask.title) {
    newTask.title = "";
  }

  // it's not meaningful to be true at creation time
  newTask.isDone = false;

  return db.transaction("rw", db.folders, db.tasks, async () => {
    const folder = await db.folders.get(newTask.folderId);

    if (!folder) {
      throw new Error("Folder not found.");
    }

    return db.tasks.add(newTask);
  });
}

export async function updateTask(id, updatedTask) {
  return db.transaction("rw", db.folders, db.tasks, async () => {
    const task = await db.tasks.get(id);

    if (!task) {
      throw new Error("Task not found");
    }

    if ("note" in updatedTask && !updatedTask.note) {
      throw new Error("Task note can not be empty");
    }

    if ("folderId" in updatedTask && task.folderId !== updatedTask.folderId) {
      const folder = await db.folders.get(updatedTask.folderId);
      if (!folder) {
        throw new Error("Can not move to non-existent folder.");
      }
    }

    return db.tasks.update(id, updatedTask);
  });
}

export async function deleteTask(id) {
  return db.transaction("rw", db.tasks, async() => {
    const task = await db.tasks.get(id);
    if(!task) {
      throw new Error("Task not found.");
    }
    await db.tasks.delete(id);
    return task;
  });
}