import React from "react";
import { FileSystemItem } from "../../interfaces/FileSystemItem";
import styles from "./FileTreeFile.module.scss";

interface FileTreeFileProps {
    item: FileSystemItem;
    onToggle: (id: string) => void;
}

const FileTreeFile: React.FC<FileTreeFileProps> = ({ item, onToggle }) => {
    return (
        <div className={styles["aside_file-tree_file"]}>
            <input
                type="checkbox"
                checked={item.isSelected}
                onChange={() => onToggle(item.id)}
            />
            <span>{item.name}</span>
        </div>
    );
};

export default FileTreeFile;
