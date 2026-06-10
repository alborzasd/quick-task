import { FolderClosedIcon } from "lucide-react";
import { useFolders } from "../../data/folders/useFolders";

function FolderList() {
  const { folders, isPending, error } = useFolders();

  return (
    <nav className="py-4 px-2">
      <ul>
        {folders.map((folder) => (
          <FolderItem folder={folder} key={folder.id} />
        ))}
      </ul>
    </nav>
  );
}

function FolderItem({ folder }) {
  return (
    <li>
      <a
        className="flex gap-1 hover:bg-yellow-100 px-1 py-1 rounded-md
          transition cursor-pointer items-center wrap-anywhere"
      >
        <FolderClosedIcon className="shrink-0 self-start" />
        <span>
          {folder.name}
          <span className="text-sm font-bold">
            {folder.isDefault ? " (default)" : ""}
          </span>
        </span>
      </a>
    </li>
  );
}

export default FolderList;
