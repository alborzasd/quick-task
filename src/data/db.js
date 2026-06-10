import Dexie from "dexie";
import { config } from "../config/config";

export const db = new Dexie("quick-task");

db.version(config.dbVersion).stores({
  folders: `
    ++id,
    name,
    isDefault,
    createdAt,
    updatedAt
  `,
  tasks: `
    ++id,
    title,
    note,
    isDone,
    folderId,
    createdAt,
    updatedAt
  `,
});

/**
 * _ (pk): primary key
 */
const creatingHookCallback = (_, obj) => {
  const now = Date.now();
  obj.createdAt = now;
  obj.updatedAt = now;
};

/**
 * mods: object contains modifications
 * _ (pk): primary key
 * obj: original object before update
 */
const updateingHookCallback = (mods, _, obj) => {
  // ignore updating createdAt field
  if("createdAt" in mods) {
    mods.createdAt = obj.createdAt;
  }

  mods.updatedAt = Date.now();
  return mods;
};

// TODO: create callback to normalize properties also on update
// create hook callback to reorder the properties of folders and tasks
// and delete additional properties
// before adding to database
const normalizeHookCreator = (properties) => {
  return (_, obj) => {
    const normilizedObj = {};

    properties.forEach((prop) => {
      normilizedObj[prop] = obj[prop];
    });

    // delete all properties so we can add again by order
    // and remove the additional properties
    Object.keys(obj).forEach((k) => delete obj[k]);

    Object.assign(obj, normilizedObj);
  };
};

const normalizeFoldersHook = normalizeHookCreator([
  "name",
  "isDefault",
  "createdAt",
  "updatedAt",
]);

const normalizeTasksHook = normalizeHookCreator([
  "title",
  "note",
  "isDone",
  "folderId",
  "createdAt",
  "updatedAt",
]);

db.folders.hook("creating", creatingHookCallback);
db.tasks.hook("creating", creatingHookCallback);

db.folders.hook("creating", normalizeFoldersHook);
db.tasks.hook("creating", normalizeTasksHook);

db.folders.hook("updating", updateingHookCallback);
db.tasks.hook("updating", updateingHookCallback);
