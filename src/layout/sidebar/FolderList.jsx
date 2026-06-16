import { EllipsisVertical, FolderClosedIcon } from "lucide-react";
import { useFolders } from "../../data/folders/useFolders";
import ButtonIcon from "../../components/button/ButtonIcon";

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
        <span className="shrink-0 self-start py-1">
          <FolderClosedIcon />
        </span>
        <span className="mr-auto">
          {folder.name + " "}
          {folder.isDefault && (
            <span
              className="text-xs tracking-wider text-white bg-blue-400 p-1
                rounded-md"
            >
              default
            </span>
          )}
        </span>
        <ButtonIcon>
          <EllipsisVertical size={20} className="text-gray-700" />
        </ButtonIcon>
      </a>
    </li>
  );
}

export default FolderList;
