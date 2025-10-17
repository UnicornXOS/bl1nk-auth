'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark';

type ThemeProviderProps = {
  children: ReactNode;
  attribute?: 'class' | 'data-theme';
  defaultTheme?: Theme | 'system';
  enableSystem?: boolean;
};

function resolveSystemTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({
  children,
  attribute = 'class',
  defaultTheme = 'system',
  enableSystem = true
}: ThemeProviderProps): ReactNode {
  const applied = useRef<Theme>('light');

  useEffect(() => {
    const applyTheme = (theme: Theme) => {
      const root = document.documentElement;
      applied.current = theme;
      if (attribute === 'class') {
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
      } else {
        root.setAttribute(attribute, theme);
      }
    };

    const pickTheme = () => {
      if (defaultTheme === 'system' && enableSystem) {
        return resolveSystemTheme();
      }
      return defaultTheme === 'dark' ? 'dark' : 'light';
    };

    applyTheme(pickTheme());

    if (!enableSystem || defaultTheme !== 'system') {
      return;
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => {
      const nextTheme = media.matches ? 'dark' : 'light';
      if (nextTheme !== applied.current) {
        applyTheme(nextTheme);
      }
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [attribute, defaultTheme, enableSystem]);

  return children;
}
