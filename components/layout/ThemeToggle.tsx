"use client";

import { useTheme } from "next-themes";
import IOS26Button from "@/components/shared/IOS26Button";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getThemeIcon = () => {
    if (theme === "system") {
      return resolvedTheme === "dark" ? "🌙" : "☀️";
    }
    return theme === "dark" ? "🌙" : "☀️";
  };

  const getThemeLabel = () => {
    if (theme === "system") {
      return `ระบบ (${resolvedTheme === "dark" ? "มืด" : "สว่าง"})`;
    }
    return theme === "dark" ? "มืด" : "สว่าง";
  };

  return (
    <IOS26Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="gap-2"
      aria-label={`เปลี่ยนธีมเป็น ${getThemeLabel()}`}
    >
      <span className="text-lg">{getThemeIcon()}</span>
      <span className="hidden sm:inline">{getThemeLabel()}</span>
    </IOS26Button>
  );
}
