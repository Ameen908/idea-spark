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
      className="relative overflow-hidden"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-500 ease-out dark:-rotate-180 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-180 scale-0 transition-all duration-500 ease-out dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
