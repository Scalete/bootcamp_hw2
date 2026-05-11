"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={cn(
        "relative flex h-5 w-9 items-center rounded-full transition-colors duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        theme === "dark" ? "bg-muted" : "bg-muted border border-border",
      )}
    >
      <span
        className={cn(
          "absolute left-0.5 flex h-4 w-4 items-center justify-center rounded-full shadow-sm transition-transform duration-300",
          theme === "dark"
            ? "translate-x-4 bg-foreground/10"
            : "translate-x-0 bg-white",
        )}
      >
        {theme === "dark" ? (
          <Moon className="h-2.5 w-2.5 text-foreground" />
        ) : (
          <Sun className="h-2.5 w-2.5 text-yellow-600" />
        )}
      </span>
    </button>
  );
}
