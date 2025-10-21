export type LocaleCode = 'th' | 'en';

export interface DesignTokens {
  brand: {
    name: string;
    tagline: Record<LocaleCode, string>;
  };
  colors: {
    background: string;
    surface: string;
    card: string;
    border: string;
    foreground: string;
    mutedForeground: string;
    primary: string;
    primaryRgb: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    success: string;
    warning: string;
    danger: string;
  };
  typography: {
    fontFamily: string;
    scale: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      display: string;
    };
    weight: {
      regular: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    lineHeight: {
      tight: number;
      snug: number;
      normal: number;
    };
  };
  spacing: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string>;
  radii: Record<'xs' | 'sm' | 'md' | 'lg' | 'full', string>;
  shadows: {
    focus: string;
    glow: string;
    overlay: string;
  };
  motion: {
    duration: {
      shortest: string;
      short: string;
      base: string;
      slow: string;
    };
    easing: {
      standard: string;
      emphasized: string;
    };
  };
}

export const designTokens: DesignTokens = {
  brand: {
    name: 'bl1nk Auth',
    tagline: {
      th: 'ระบบยืนยันตัวตนและการจัดการลูกค้าแบบครบวงจร',
      en: 'Unified identity and customer management platform'
    }
  },
  colors: {
    background: '#050b1d',
    surface: '#0b1220',
    card: 'rgba(15, 23, 42, 0.55)',
    border: 'rgba(255, 255, 255, 0.08)',
    foreground: '#f8fafc',
    mutedForeground: 'rgba(248, 250, 252, 0.7)',
    primary: 'hsl(226 70% 55%)',
    primaryRgb: '83, 99, 220',
    primaryForeground: 'hsl(226 100% 98%)',
    secondary: 'hsl(252 65% 60%)',
    secondaryForeground: 'hsl(252 100% 98%)',
    accent: 'hsl(210 90% 56%)',
    accentForeground: 'hsl(210 100% 98%)',
    success: 'hsl(150 57% 45%)',
    warning: 'hsl(38 90% 55%)',
    danger: 'hsl(0 78% 60%)'
  },
  typography: {
    fontFamily: `'Inter', 'Sarabun', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif`,
    scale: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      display: '3rem'
    },
    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: {
      tight: 1.1,
      snug: 1.25,
      normal: 1.5
    }
  },
  spacing: {
    xs: '0.375rem',
    sm: '0.75rem',
    md: '1.5rem',
    lg: '2.5rem',
    xl: '4rem'
  },
  radii: {
    xs: '6px',
    sm: '10px',
    md: '14px',
    lg: '20px',
    full: '9999px'
  },
  shadows: {
    focus: '0 0 0 3px rgba(83, 99, 220, 0.35)',
    glow: '0 0 28px rgba(83, 99, 220, 0.35)',
    overlay: '0 24px 48px rgba(5, 11, 29, 0.55)'
  },
  motion: {
    duration: {
      shortest: '120ms',
      short: '180ms',
      base: '240ms',
      slow: '360ms'
    },
    easing: {
      standard: 'cubic-bezier(0.2, 0, 0.38, 0.9)',
      emphasized: 'cubic-bezier(0.3, 0, 0, 1)'
    }
  }
};

export const defaultLocale: LocaleCode = 'th';

export function getLocalizedText<T extends Record<LocaleCode, string>>(
  record: T,
  locale: LocaleCode = defaultLocale
): string {
  return record[locale] ?? record.en;
}
