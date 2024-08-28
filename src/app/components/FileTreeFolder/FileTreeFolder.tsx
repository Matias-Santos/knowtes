// components/FileTreeFolder.tsx
import React from "react";
import { FileSystemItem } from "../../interfaces/FileSystemItem";
import FileTreeFile from "../FileTreeFile/FileTreeFile";
import styles from "./FileTreeFolder.module.scss";

interface FileTreeFolderProps {
    item: FileSystemItem;
    onToggle: (id: string) => void;
    onToggleFolder: (id: string) => void;
}

const FileTreeFolder: React.FC<FileTreeFolderProps> = ({
    item,
    onToggle,
    onToggleFolder,
}) => {
    return (
        <div className={styles["aside__file-tree__folder"]}>
            <div className={styles["aside__file-tree__folder-header"]}>
                <input
                    type="checkbox"
                    checked={item.isSelected}
                    onChange={() => onToggleFolder(item.id)}
                    className="aside__file-tree__folder-checkbox"
                />
                <span className={styles["aside__file-tree__folder-title"]}>
                    {item.name}
                </span>
            </div>
            {item.isOpen && (
                <div className={styles["aside__file-tree__folder-contents"]}>
                    {item.subfolders?.map((subItem) =>
                        subItem.isFolder ? (
                            <FileTreeFolder
                                key={subItem.id}
                                item={subItem}
                                onToggle={onToggle}
                                onToggleFolder={onToggleFolder}
                            />
                        ) : (
                            <FileTreeFile
                                key={subItem.id}
                                item={subItem}
                                onToggle={onToggle}
                            />
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default FileTreeFolder;
