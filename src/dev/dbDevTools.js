import { db } from "../data/db";
import {
  getFolders,
  createFolder,
  updateFolder,
  deleteFolder,
  setFolderAsDefault,
} from "../data/folders/foldersRepository";

import {
  createTask,
  updateTask,
  deleteTask,
} from "../data/tasks/tasksRepository";

import folders from "./seed/folders.json";
import tasks from "./seed/tasks.json";

async function seedData(addDefault = false) {
  for (let folder of folders) {
    if (addDefault === false && folder.isDefault) continue;
    folder.id = await createFolder(folder);
  }

  /**
   * if addDefault=true the default folder in json
   * will get id
   * but if it's false it won't get id
   * we have to get id from database
   */
  const defaultFolderId = (
    await db.folders.filter((folder) => folder.isDefault === true).first()
  ).id;

  if (!defaultFolderId) {
    throw new Error("Database integrity Error, Default Folder not found.");
  }

  for (let task of tasks) {
    if (task.folderId === "default") {
      task.folderId = defaultFolderId;
    } else {
      task.folderId = folders.find(
        (folder) => folder.name === task.folderId,
      ).id; // folders that are not default, will definitely get id
    }
    await createTask(task);
  }

  console.log(
    `${folders.length - !addDefault} folders ` +
      `and ${tasks.length} tasks are added successfully.`,
  );
}

// removes even the default folder
async function clearData() {
  await db.folders.clear();
  await db.tasks.clear();
  console.log("Data has been cleared successfully.");
}

async function resetDatabase() {
  await clearData();
  await db.delete();
  console.log("Database has been reset successfully.");
}

export default {
  db,
  seedData,
  clearData,
  resetDatabase,

  getFolders,
  createFolder,
  updateFolder,
  deleteFolder,
  setFolderAsDefault,

  createTask,
  updateTask,
  deleteTask,
};
