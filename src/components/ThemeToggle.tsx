import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative overflow-hidden rounded-xl hover:bg-background/50 group"
    >
      <div className="relative w-4 h-4">
        <Sun className="absolute inset-0 h-4 w-4 rotate-0 scale-100 transition-all duration-700 ease-out dark:-rotate-180 dark:scale-0 text-amber-500 group-hover:text-amber-400" />
        <Moon className="absolute inset-0 h-4 w-4 rotate-180 scale-0 transition-all duration-700 ease-out dark:rotate-0 dark:scale-100 text-primary group-hover:text-primary/80" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
