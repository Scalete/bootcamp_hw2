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
import { TbMarkdown } from "react-icons/tb";

export function getFileIcon(name: string) {
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
