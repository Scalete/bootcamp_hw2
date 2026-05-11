"use client";

import { useState } from "react";
import { FileNode } from "@/types/fs";
import { ChevronRight, Folder, FolderOpen } from "lucide-react";
import {
  SiTypescript,
  SiJavascript,
  SiCss,
  SiHtml5,
  SiReact,
  SiPrisma,
  SiGit,
} from "react-icons/si";

import { VscFile, VscFileMedia, VscFilePdf, VscJson } from "react-icons/vsc";
import { cn } from "@/lib/utils";
import { TbMarkdown } from "react-icons/tb";

interface Props {
  name: string;
  node: FileNode;
  depth?: number;
}

function getFileIcon(name: string) {
  const ext = name.includes(".") ? name.split(".").pop()?.toLowerCase() : "";

  switch (ext) {
    case "ts":
      return (
        <SiTypescript className="h-4 w-4 shrink-0 text-blue-500 dark:text-blue-400" />
      );
    case "tsx":
      return (
        <SiReact className="h-4 w-4 shrink-0 text-cyan-500 dark:text-cyan-400" />
      );
    case "js":
      return (
        <SiJavascript className="h-4 w-4 shrink-0 text-yellow-500 dark:text-yellow-400" />
      );
    case "jsx":
      return (
        <SiReact className="h-4 w-4 shrink-0 text-cyan-500 dark:text-cyan-300" />
      );
    case "css":
      return (
        <SiCss className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-500" />
      );
    case "html":
      return (
        <SiHtml5 className="h-4 w-4 shrink-0 text-orange-600 dark:text-orange-500" />
      );
    case "json":
      return (
        <VscJson className="h-4 w-4 shrink-0 text-yellow-600 dark:text-yellow-300" />
      );
    case "md":
    case "mdx":
      return (
        <TbMarkdown className="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-300" />
      );
    case "prisma":
      return (
        <SiPrisma className="h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400" />
      );
    case "gitignore":
    case "git":
      return (
        <SiGit className="h-4 w-4 shrink-0 text-orange-600 dark:text-orange-400" />
      );
    case "png":
    case "jpg":
    case "jpeg":
    case "svg":
    case "ico":
    case "webp":
      return (
        <VscFileMedia className="h-4 w-4 shrink-0 text-purple-500 dark:text-purple-400" />
      );
    case "pdf":
      return (
        <VscFilePdf className="h-4 w-4 shrink-0 text-red-500 dark:text-red-400" />
      );
    case "mp4":
    case "mkv":
    case "avi":
    case "mov":
      return (
        <VscFileMedia className="h-4 w-4 shrink-0 text-pink-500 dark:text-pink-400" />
      );
    default:
      return <VscFile className="h-4 w-4 shrink-0 text-muted-foreground" />;
  }
}

function getExtension(name: string): string | null {
  if (!name.includes(".")) return null;
  return name.split(".").pop() ?? null;
}

export function TreeNode({ name, node, depth = 0 }: Props) {
  const [open, setOpen] = useState(depth === 0);
  const isFolder = node.type === "folder";
  const entries = node.children ? Object.entries(node.children) : [];

  const sorted = [
    ...entries.filter(([, n]) => n.type === "folder"),
    ...entries.filter(([, n]) => n.type === "file"),
  ];

  const ext = !isFolder ? getExtension(name) : null;

  return (
    <li className="select-none">
      <div
        className={cn(
          "group flex items-center gap-1.5 rounded-sm py-[3px] pr-3 text-sm",
          "hover:bg-accent hover:text-accent-foreground",
          isFolder ? "cursor-pointer" : "cursor-default",
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={() => isFolder && setOpen((o) => !o)}
      >
        {/* Стрелка */}
        {isFolder ? (
          <ChevronRight
            className={cn(
              "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-150",
              open && "rotate-90",
            )}
          />
        ) : (
          <span className="w-3.5 shrink-0" />
        )}

        {/* Иконка */}
        {isFolder ? (
          open ? (
            <FolderOpen className="h-4 w-4 shrink-0 text-yellow-500 dark:text-yellow-400" />
          ) : (
            <Folder className="h-4 w-4 shrink-0 text-yellow-500 dark:text-yellow-400" />
          )
        ) : (
          getFileIcon(name)
        )}

        {/* Имя файла */}
        <span className="flex-1 truncate">
          {isFolder ? (
            name
          ) : ext ? (
            <>
              <span className="text-foreground">
                {name.slice(0, -(ext.length + 1))}
              </span>
              <span className="text-muted-foreground">.{ext}</span>
            </>
          ) : (
            name
          )}
        </span>
      </div>

      {/* Дети */}
      {isFolder && open && sorted.length > 0 && (
        <ul>
          {sorted.map(([childName, childNode]) => (
            <TreeNode
              key={childName}
              name={childName}
              node={childNode}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
