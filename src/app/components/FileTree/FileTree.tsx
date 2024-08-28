"use client";
// components/FileTree.tsx
import React, { useState, useEffect } from "react";
import FileTreeFolder from "../FileTreeFolder/FileTreeFolder";
import { FileSystemItem } from "../../interfaces/FileSystemItem";

import styles from "./FileTree.module.scss";

// Mock function to simulate fetching data
const fetchData = async (): Promise<FileSystemItem> => {
    // Replace this with actual data fetching logic
    return {
        id: "root",
        name: "Root Folder",
        isFolder: true,
        isOpen: true,
        isSelected: false,
        subfolders: [
            {
                id: "file1",
                name: "File 1.md",
                isFolder: false,
                isOpen: false,
                isSelected: false,
            },
            {
                id: "folder1",
                name: "Folder 1",
                isFolder: true,
                isOpen: false,
                isSelected: false,
                subfolders: [
                    {
                        id: "file2",
                        name: "File 2.md",
                        isFolder: false,
                        isOpen: false,
                        isSelected: false,
                    },
                    {
                        id: "folder2",
                        name: "Folder 2",
                        isFolder: true,
                        isOpen: false,
                        isSelected: false,
                        subfolders: [
                            {
                                id: "file3",
                                name: "File 3.md",
                                isFolder: false,
                                isOpen: false,
                                isSelected: false,
                            },
                        ],
                    },
                ],
            },
        ],
    };
};

const FileTree: React.FC = () => {
    const [data, setData] = useState<FileSystemItem | null>(null);

    useEffect(() => {
        const loadData = async () => {
            const result = await fetchData();
            setData(result);
        };
        loadData();
    }, []);

    const toggleSelection = (id: string) => {
        const toggleItem = (item: FileSystemItem) => {
            if (item.id === id) {
                item.isSelected = !item.isSelected;
            }
            if (item.subfolders) {
                item.subfolders.forEach(toggleItem);
            }
        };

        if (data) {
            toggleItem(data);
            setData({ ...data });
        }
    };

    const toggleFolder = (id: string) => {
        const toggleItem = (item: FileSystemItem) => {
            if (item.id === id) {
                item.isOpen = !item.isOpen;
            }
            if (item.subfolders) {
                item.subfolders.forEach(toggleItem);
            }
        };

        if (data) {
            toggleItem(data);
            setData({ ...data });
        }
    };

    return (
        <div className={styles["aside__file-tree"]}>
            {data && (
                <FileTreeFolder
                    item={data}
                    onToggle={toggleSelection}
                    onToggleFolder={toggleFolder}
                />
            )}
        </div>
    );
};

export default FileTree;
