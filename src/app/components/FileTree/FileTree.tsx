"use client";

import React, { useState, useEffect } from "react";
import { FileSystemItem } from "../Interfaces/FileSystemItem";
import "./styles.scss";

// Sample file system structure
const fileSystemItems: FileSystemItem[] = [
  {
    name: "Folder 1",
    isFolder: true,
    children: [
      {
        name: "File 1",
        isFolder: false,
      },
      {
        name: "File 2",
        isFolder: false,
      },
    ],
  },
  {
    name: "Folder 2",
    isFolder: true,
    children: [
      {
        name: "File 3",
        isFolder: false,
      },
      {
        name: "File 4",
        isFolder: false,
      },
    ],
  },
];

interface FileTreeState {
  openFolders: { [key: string]: boolean };
  selectedItems: Set<string>;
}

export default function FileTree() {
  const [state, setState] = useState<FileTreeState>({
    openFolders: {},
    selectedItems: new Set(),
  });

  // Save to local storage
  useEffect(() => {
    localStorage.setItem(
      "selectedItems",
      JSON.stringify([...state.selectedItems])
    );
  }, [state.selectedItems]);

  // Retrieve from local storage
  useEffect(() => {
    const savedState = localStorage.getItem("selectedItems");
    if (savedState) {
      setState((prev) => ({
        ...prev,
        selectedItems: new Set(JSON.parse(savedState)),
      }));
    }
  }, []);

  // Toggle folder open/close state
  const toggleFolder = (folderName: string) => {
    setState((prev) => ({
      ...prev,
      openFolders: {
        ...prev.openFolders,
        [folderName]: !prev.openFolders[folderName],
      },
    }));
  };

  // Toggle selection state
  const toggleSelection = (itemName: string) => {
    setState((prev) => {
      const selectedItems = new Set(prev.selectedItems);
      if (selectedItems.has(itemName)) {
        selectedItems.delete(itemName);
      } else {
        selectedItems.add(itemName);
      }
      return { ...prev, selectedItems };
    });
  };

  // Render a file or folder
  const renderFileSystemItem = (item: FileSystemItem) => {
    const isSelected = state.selectedItems.has(item.name);
    const isOpen = item.isFolder
      ? state.openFolders[item.name] || false
      : false;

    if (item.isFolder) {
      return (
        <div
          key={item.name}
          className={`folder ${isSelected ? "selected" : ""}`}>
          <div
            className="folder-title"
            onClick={() => {
              toggleFolder(item.name);
              toggleSelection(item.name);
            }}>
            {isOpen ? "📂" : "📁"} {item.name}
          </div>
          {isOpen && (
            <div className="folder-contents">
              {item.children?.map((child) => renderFileSystemItem(child))}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div
          key={item.name}
          className={`file ${isSelected ? "selected" : ""}`}
          onClick={() => toggleSelection(item.name)}>
          <div className="file-title">📄 {item.name}</div>
        </div>
      );
    }
  };

  return (
    <aside className="aside">
      <div className="file-tree-header-title">
        <h1>File Tree</h1>
      </div>
      <div className="file-tree-body">
        <div className="file-tree-body-content">
          {fileSystemItems.map((item) => renderFileSystemItem(item))}
        </div>
      </div>
    </aside>
  );
}
