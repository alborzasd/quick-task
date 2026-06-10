import { db } from "../db";
import { config } from "../../config/config";

/**
 * this function is private to this file
 * only called inside functions that handle the "only one default folder" rule
 */
async function setAllToNotDefault() {
  await db.folders.toCollection().modify({ isDefault: false });
}

export async function getFolders() {
  return db.folders.orderBy("id").toArray();
}

/**
 * checkDefault=false skips the integrity check
 *
 * if newFolder.isDefault is true and checkDefault is true
 * then before adding the folder, check all folders with default: true
 * and set them to false
 *
 * if checkDefault is false just add the folder
 * no matter isDefault is true or false
 * the second case is applied in the ensureDefaultFolder
 * because checking for default folders is already done
 */
export async function createFolder(newFolder = {}, checkDefault = true) {
  if (!newFolder.name) {
    const count = await db.folders.count();
    newFolder.name = `Folder(${count + 1})`;
  }

  // set to false if it's undefined or other falsy values
  if (!newFolder.isDefault) {
    newFolder.isDefault = false;
  }

  if (newFolder.isDefault === true && checkDefault === true) {
    return db.transaction("rw", db.folders, async () => {
      await setAllToNotDefault();
      return db.folders.add(newFolder);
    });
  }

  return db.folders.add(newFolder);
}

// TODO: wrap all logic inside transaction
// TODO: prevent set name to empty value
export async function updateFolder(id, updatedFolder, checkDefault = true) {
  const folder = await db.folders.get(id);
  if (!folder) {
    throw new Error("Folder not found.");
  }

  if (updatedFolder.isDefault === true && checkDefault === true) {
    return db.transaction("rw", db.folders, async () => {
      await setAllToNotDefault();
      return db.folders.update(id, updatedFolder);
    });
  }

  // prevent update default folder to not default
  if (updatedFolder.isDefault === false && checkDefault === true) {
    return db.transaction("rw", db.folders, async () => {
      const folder = await db.folders.get(id);
      if (folder.isDefault === true) {
        throw new Error(
          "Can not set default-folder to not-default. " +
            "You have to set another folder as default first.",
        );
      }
      return db.folders.update(id, updatedFolder);
    });
  }

  return db.folders.update(id, updatedFolder);
}

export async function deleteFolder(id) {
  return db.transaction("rw", db.folders, db.tasks, async () => {
    const folder = await db.folders.get(id);

    if (!folder) {
      throw new Error("Folder not found.");
    }

    if (folder.isDefault) {
      throw new Error(
        "Cannot delete default folder. You can set another folder as default.",
      );
    }

    // cascade delete
    await db.tasks.where("folderId").equals(id).delete();

    await db.folders.delete(id);

    return folder;
  });
}

export async function setFolderAsDefault(id) {
  return updateFolder(id, { isDefault: true });
}

export async function ensureDefaultFolder() {
  /**
   * if no folder at all: create a new default (return true)
   * if has folders but no one is set to default
   * or
   * if has folders but more than one is set to default
   * only set the first one to default
   * this happens if database is manipulated outside app
   *
   * returns true if any data is updated during this call
   * (could be creating a new folder or updating existing folders so only one
   * folder can be default)
   * the cache will be invalidated if result is true
   */
  async function transactionCallback() {
    const folders = await getFolders();

    if (folders.length === 0) {
      const newFolder = {
        name: config.defaultFolderName,
        isDefault: true,
      };

      await createFolder(newFolder, false);
      return {
        newFolderCreated: true,
        dataWasCorrupted: false,
      };
    }

    // more than one or zero default flags
    if (folders.filter((folder) => folder.isDefault).length !== 1) {
      const first = folders[0];

      await updateFolder(first.id, { isDefault: true }, false);

      await db.folders
        .where("id")
        .notEqual(first.id)
        .modify((folder) => {
          folder.isDefault = false;
        });

      return {
        newFolderCreated: true,
        dataWasCorrupted: true,
      };
    }

    return {
      newFolderCreated: false,
      dataWasCorrupted: false,
    };
  }

  /**
   * checking and then creating default folder must be inside transaction
   * so if this function is called twice (in React.StrictMode)
   * the second call must be waited in a queue
   * without transaction, the two db.folders() call see an empty database
   * and two default folders will be created
   */
  return db.transaction("rw", db.folders, transactionCallback);
}
