declare module 'next-themes' {
  export interface ThemeProviderProps {
    children: React.ReactNode;
    attribute?: string;
    defaultTheme?: string;
    enableSystem?: boolean;
    themes?: string[];
    disableTransitionOnChange?: boolean;
    enableColorScheme?: boolean;
    storageKey?: string;
    nonce?: string;
  }

  export const ThemeProvider: React.FC<ThemeProviderProps>;
  
  export function useTheme(): {
    theme: string | undefined;
    setTheme: (theme: string) => void;
    themes: string[];
    systemTheme: 'light' | 'dark' | undefined;
  };
}
