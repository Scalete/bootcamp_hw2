"use client";

import { useState, useMemo } from "react";
import { FSRoot, FileNode } from "@/types/fs";
import { TreeNode } from "./TreeNode";
import { Search, X } from "lucide-react";

interface Props {
  data: FSRoot;
}

function filterNode(name: string, node: FileNode, q: string): FileNode | null {
  if (!q) return node;
  const lower = name.toLowerCase();
  if (node.type === "file") {
    return lower.includes(q) ? node : null;
  }
  if (lower.includes(q)) return node;
  const filteredChildren: Record<string, FileNode> = {};
  for (const [childName, child] of Object.entries(node.children)) {
    const next = filterNode(childName, child, q);
    if (next) filteredChildren[childName] = next;
  }
  return Object.keys(filteredChildren).length > 0
    ? { type: "folder", children: filteredChildren }
    : null;
}

function filterTree(data: FSRoot, query: string): FSRoot {
  const q = query.trim().toLowerCase();
  if (!q) return data;
  const out: FSRoot = {};
  for (const [name, node] of Object.entries(data)) {
    const next = filterNode(name, node, q);
    if (next) out[name] = next;
  }
  return out;
}

export function FileTree({ data }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(
    () => filterTree(data, searchQuery),
    [data, searchQuery],
  );

  const sorted = useMemo(() => {
    const entries = Object.entries(filteredData);
    return [
      ...entries.filter(([, n]) => n.type === "folder"),
      ...entries.filter(([, n]) => n.type === "file"),
    ];
  }, [filteredData]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-2 py-2 border-b border-border">
        <div className="relative flex items-center">
          <Search className="absolute left-2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search files..."
            className="w-full rounded bg-muted py-1 pl-7 pr-7 text-[12px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring/60 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      <ul className="py-1 flex-1">
        {sorted.length === 0 ? (
          <li className="px-3 py-4 text-center text-xs text-muted-foreground">
            No matches
          </li>
        ) : (
          sorted.map(([name, node]) => (
            <TreeNode
              key={name}
              name={name}
              node={node}
              depth={0}
              searchQuery={searchQuery}
            />
          ))
        )}
      </ul>
    </div>
  );
}
