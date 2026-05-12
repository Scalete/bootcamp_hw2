export type FileNode =
  | { type: "file" }
  | { type: "folder"; children: Record<string, FileNode> };

export type FSRoot = Record<string, FileNode>;

export function parseFSRoot(raw: unknown): FSRoot | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const out: FSRoot = {};
  for (const [key, val] of Object.entries(raw)) {
    const node = parseFileNode(val);
    if (!node) return null;
    out[key] = node;
  }
  return out;
}

function parseFileNode(raw: unknown): FileNode | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const o = raw as Record<string, unknown>;
  if (o.type === "file") return { type: "file" };
  if (o.type === "folder") {
    const c = o.children;
    if (!c || typeof c !== "object" || Array.isArray(c)) return null;
    const children: Record<string, FileNode> = {};
    for (const [k, v] of Object.entries(c)) {
      const child = parseFileNode(v);
      if (!child) return null;
      children[k] = child;
    }
    return { type: "folder", children };
  }
  return null;
}
