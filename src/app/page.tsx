import { FSRoot, parseFSRoot } from "@/types/fs";
import { FileTree } from "@/components/FileTree";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/ThemeToggle";

async function loadFsData(): Promise<
  { ok: true; data: FSRoot } | { ok: false; message: string }
> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/fs-data.json`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return {
        ok: false,
        message: `Request failed with status ${res.status}.`,
      };
    }

    let json: unknown;
    try {
      json = await res.json();
    } catch {
      return { ok: false, message: "Response body is not valid JSON." };
    }

    const rawRoot =
      json && typeof json === "object" && !Array.isArray(json)
        ? (json as Record<string, unknown>).root
        : undefined;

    const data = parseFSRoot(rawRoot);
    if (!data) {
      return {
        ok: false,
        message: "fs-data.json does not match the expected shape.",
      };
    }

    return { ok: true, data };
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "An unknown error occurred while loading data.";
    return { ok: false, message };
  }
}

export default async function Home() {
  const result = await loadFsData();

  return (
    <main className="flex min-h-screen items-start justify-center bg-background p-8">
      <div className="w-full max-w-sm overflow-hidden rounded-lg border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b px-3 py-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Explorer
          </span>
          <ThemeToggle />
        </div>

        <ScrollArea className="h-[480px]">
          {result.ok ? (
            <FileTree data={result.data} />
          ) : (
            <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 px-4 py-8 text-center">
              <p className="text-sm font-medium text-destructive">
                Could not load file tree
              </p>
              <p className="text-xs text-muted-foreground">{result.message}</p>
            </div>
          )}
        </ScrollArea>
      </div>
    </main>
  );
}
