export interface FileSystemItem {
  id: string;
  name: string;
  isFolder: boolean;
  isOpen: boolean;
  isSelected: boolean;
  subfolders?: FileSystemItem[]; // Nested folders
}
