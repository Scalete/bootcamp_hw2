export type FileNode = {
  type: "file" | "folder";
  children?: Record<string, FileNode>;
};

export type FSRoot = Record<string, FileNode>;
