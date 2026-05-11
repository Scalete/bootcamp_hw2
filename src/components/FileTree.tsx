"use client";

import { useState, useMemo } from "react";
import { FSRoot } from "@/types/fs";
import { TreeNode } from "./TreeNode";
import { Search, X } from "lucide-react";

interface Props {
  data: FSRoot;
}

export function FileTree({ data }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const sorted = useMemo(() => {
    const entries = Object.entries(data);
    return [
      ...entries.filter(([, n]) => n.type === "folder"),
      ...entries.filter(([, n]) => n.type === "file"),
    ];
  }, [data]);

  return (
    <div className="flex flex-col h-full">
      {/* Search bar */}
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
              onClick={() => setSearchQuery("")}
              className="absolute right-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* Tree */}
      <ul className="py-1 flex-1">
        {sorted.map(([name, node]) => (
          <TreeNode
            key={name}
            name={name}
            node={node}
            depth={0}
            searchQuery={searchQuery}
          />
        ))}
      </ul>
    </div>
  );
}
