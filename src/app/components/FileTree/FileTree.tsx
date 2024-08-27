"use client";

import React, { useState, useEffect } from "react";
import { FileSystemItem } from "@/app/interfaces/FileSystemItem";
import { fileSystemItems } from "./FileTreeMock";
import "./styles.scss";
import FileTreeItem from "../FileTreeItem/FileTreeItem";

// Sample file system structure
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
  const toggleFolder = (folderId: string) => {
    setState((prev) => ({
      ...prev,
      openFolders: {
        ...prev.openFolders,
        [folderId]: !prev.openFolders[folderId],
      },
    }));
  };

  // Toggle selection state
  const toggleSelection = (itemId: string) => {
    setState((prev) => {
      const selectedItems = new Set(prev.selectedItems);
      if (selectedItems.has(itemId)) {
        selectedItems.delete(itemId);
      } else {
        selectedItems.add(itemId);
      }
      return { ...prev, selectedItems };
    });
  };

  // Render a file or folder
  const renderFileSystemItem = (item: FileSystemItem) => {
    const isSelected = state.selectedItems.has(item.name);
    const isOpen = item.isFolder
      ? state.openFolders[item.id] || false
      : false;

    if (item.isFolder) {
      return (
        <div className="aside__file-tree__folder">
          <div key={item.name} className=".aside__file-tree__folder-header">
            <div
              className="aside__file-tree__folder-title"
              onClick={() => {
                toggleFolder(item.id);
                toggleSelection(item.id);
              }}>
              {isOpen ? "📂" : "📁"} {item.name}
            </div>
          </div>
          <div className="aside__file-tree__folder-contents">
            {isOpen && (
              <div>
                {item.children?.map((child) => renderFileSystemItem(child))}
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="aside__file-tree__file">
        <div className="aside__file-tree__file-title">📄 {item.name}</div>
      </div>
    );
  };

  return (
    <aside className="aside__file-tree">
      <div className="aside__file-tree__header-title">
        <h1>File Tree</h1>
      </div>
      <div className="aside__file-tree__content">
        {fileSystemItems.map((item: FileSystemItem) =>
          renderFileSystemItem(item)
        )}
        <FileTreeItem />
      </div>
    </aside>
  );
}
