import {useState} from "react";
import { FileSystemItem } from "@/app/interfaces/FileSystemItem";
import "./styles.scss";
import FileTreeHeader from "../FileTreeHeader/FileTreeHeader";

interface FileTreeState {
    openFolders: { [key: string]: boolean };
    selectedItems: Set<string>;
  }
  
export default function FileTreeItem(item: FileSystemItem) {
    const [state, setState] = useState<FileTreeState>({
      openFolders: {},
      selectedItems: new Set(),
    });
  
    const isSelected = state.selectedItems.has(item.name);
    const isOpen = item.isFolder
      ? state.openFolders[item.id] || false
      : false;

    return (
        <div className="file-tree-item">
            <p>Hi there!</p>
            <FileTreeHeader />
        </div>
    )
}