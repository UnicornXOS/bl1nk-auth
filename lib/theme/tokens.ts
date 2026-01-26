// Design tokens and localization
export type LocaleCode = "en" | "th";

export const designTokens = {
  colors: {
    primary: "#00D9FF",
    secondary: "#A855F7",
    accent: "#FCD34D",
    background: "#0A0A0A",
    surface: "#1A1A1A",
  },
  fonts: {
    display: "Orbitron, sans-serif",
    body: "Inter, sans-serif",
    mono: "Roboto Mono, monospace",
  },
} as const;

const translations = {
  en: {
    welcome: "Welcome",
    login: "Login",
    logout: "Logout",
    dashboard: "Dashboard",
  },
  th: {
    welcome: "ยินดีต้อนรับ",
    login: "เข้าสู่ระบบ",
    logout: "ออกจากระบบ",
    dashboard: "แดชบอร์ด",
  },
} as const;

export function getLocalizedText(
  locale: LocaleCode,
  key: keyof typeof translations.en,
): string {
  return translations[locale][key];
}
