export interface FileSystemItem {
  name: string;
  isFolder: boolean;
  children?: FileSystemItem[];
}
