// Type definitions for next/font

type Display = 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

declare module 'next/font/google' {
  interface FontOptions {
    weight?: FontWeight | `${FontWeight}` | Array<FontWeight>;
    style?: 'normal' | 'italic' | Array<'normal' | 'italic'>;
    subsets?: string[];
    display?: Display;
    variable?: string;
    preload?: boolean;
    fallback?: string[];
    adjustFontFallback?: boolean | 'Arial' | 'Times New Roman' | false;
    preloadFonts?: boolean;
  }

  interface NextFontWithVariable {
    className: string;
    variable: string;
    style: { fontFamily: string; [key: string]: any };
  }

  type NextFont = NextFontWithVariable;

  export function Inter(options?: FontOptions): NextFont;
  export function Roboto(options?: FontOptions): NextFont;
  export function Open_Sans(options?: FontOptions): NextFont;
  export function Montserrat(options?: FontOptions): NextFont;
  export function Lato(options?: FontOptions): NextFont;
  export function Poppins(options?: FontOptions): NextFont;
  export function Raleway(options?: FontOptions): NextFont;
  // Add other Google Fonts as needed
}

declare module 'next/font/local' {
  interface LocalFontOptions {
    src: string | Array<{ path: string; weight?: string; style?: string }>;
    display?: Display;
    weight?: string;
    style?: 'normal' | 'italic' | Array<'normal' | 'italic'>;
    preload?: boolean;
    fallback?: string[];
    adjustFontFallback?: boolean | 'Arial' | 'Times New Roman' | false;
    variable?: string;
  }

  interface NextFontWithVariable {
    className: string;
    variable: string;
    style: { fontFamily: string; [key: string]: any };
  }

  export default function localFont(options: LocalFontOptions): NextFontWithVariable;
}
