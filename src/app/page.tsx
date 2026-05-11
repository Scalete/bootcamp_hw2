import { FSRoot } from "@/types/fs";
import { FileTree } from "@/components/FileTree";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/ThemeToggle";

async function getData(): Promise<FSRoot> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const res = await fetch(`${baseUrl}/fs-data.json`, {
    cache: "no-store",
  });
  const json = await res.json();
  return json.root as FSRoot;
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="flex min-h-screen items-start justify-center bg-background p-8">
      <div className="w-full max-w-sm overflow-hidden rounded-lg border bg-card shadow-sm">
        {/* Заголовок */}
        <div className="flex items-center justify-between border-b px-3 py-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Explorer
          </span>
          <ThemeToggle />
        </div>

        {/* Дерево */}
        <ScrollArea className="h-[480px]">
          <FileTree data={data} />
        </ScrollArea>
      </div>
    </main>
  );
}
