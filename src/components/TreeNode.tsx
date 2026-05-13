"use client";

import { useState } from "react";
import { FileNode } from "@/types/fs";
import { ChevronRight, Folder, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { getFileIcon } from "./file-icon";

interface Props {
  name: string;
  node: FileNode;
  depth?: number;
  searchQuery: string;
}

function getExtension(name: string): string | null {
  if (!name.includes(".")) return null;
  return name.split(".").pop() ?? null;
}

function MatchHighlight({
  text,
  query,
  className,
}: {
  text: string;
  query: string;
  className?: string;
}) {
  const q = query.trim().toLowerCase();
  if (!q) {
    return <span className={className}>{text}</span>;
  }
  const lower = text.toLowerCase();
  const idx = lower.indexOf(q);
  if (idx === -1) {
    return <span className={className}>{text}</span>;
  }
  return (
    <span className={className}>
      {text.slice(0, idx)}
      <mark className="rounded bg-yellow-500/35 px-0.5 dark:bg-yellow-400/25">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </span>
  );
}

export function TreeNode({
  name,
  node,
  depth = 0,
  searchQuery,
}: Props) {
  const [open, setOpen] = useState(depth === 0);
  const isFolder = node.type === "folder";
  const entries = isFolder ? Object.entries(node.children) : [];

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

        {isFolder ? (
          open ? (
            <FolderOpen className="h-4 w-4 shrink-0 text-yellow-500 dark:text-yellow-400" />
          ) : (
            <Folder className="h-4 w-4 shrink-0 text-yellow-500 dark:text-yellow-400" />
          )
        ) : (
          getFileIcon(name)
        )}

        <span className="flex-1 truncate">
          {isFolder ? (
            <MatchHighlight text={name} query={searchQuery} />
          ) : ext ? (
            <>
              <MatchHighlight
                text={name.slice(0, -(ext.length + 1))}
                query={searchQuery}
                className="text-foreground"
              />
              <span className="text-muted-foreground">.</span>
              <MatchHighlight
                text={ext}
                query={searchQuery}
                className="text-muted-foreground"
              />
            </>
          ) : (
            <MatchHighlight text={name} query={searchQuery} />
          )}
        </span>
      </div>

      {isFolder && open && sorted.length > 0 && (
        <ul>
          {sorted.map(([childName, childNode]) => (
            <TreeNode
              key={childName}
              name={childName}
              node={childNode}
              depth={depth + 1}
              searchQuery={searchQuery}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
