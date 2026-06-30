// Design tokens and localization
export type LocaleCode = "en" | "th";

export const designTokens = {
  colors: {
    primary: "#00D9FF",
    secondary: "#A855F7",
    accent: "#FCD34D",
    background: "#0A0A0A",
    surface: "#1A1A1A",
    border: "#334155",
    foreground: "#F8FAFC",
    primaryForeground: "#0F172A",
    secondaryForeground: "#64748B",
  },
  shadows: {
    glow: "0 0 15px rgba(0, 217, 255, 0.5)",
  },
  fonts: {
    display: "Orbitron, sans-serif",
    body: "Inter, sans-serif",
    mono: "Roboto Mono, monospace",
  },
  brand: {
    name: "BL1NK AUTH",
    tagline: {
      th: "ระบบจัดการตัวตนและการเข้าถึงแบบรวมศูนย์",
      en: "Centralized Identity & Access Management",
    },
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

export function getLocalizedText(locale: LocaleCode, key: keyof typeof translations.en): string {
  return translations[locale][key];
}
