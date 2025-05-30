import { ReactNode, ReactElement, CSSProperties, HTMLAttributes } from 'react';

declare global {
  // Extend the Window interface
  interface Window {
    __NEXT_DATA__: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
    __APOLLO_STATE__?: any;
    __INITIAL_PROPS__?: any;
    __NEXT_REDUX_STORE__?: any;
    gtag?: (...args: any[]) => void;
    dataLayer?: Record<string, any>[];
    fbq?: (...args: any[]) => void;
    twq?: (...args: any[]) => void;
    _paq?: any[];
    _mtm?: any[];
    _hsq?: any[];
    _hsp?: any[];
    _hsq?: any[];
    _hsq?: any[];
  }

  // Extend the NodeJS.Process interface
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      NEXT_PUBLIC_APP_NAME: string;
      NEXT_PUBLIC_APP_URL: string;
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_GA_TRACKING_ID?: string;
      NEXT_PUBLIC_FACEBOOK_PIXEL_ID?: string;
      NEXT_PUBLIC_TWITTER_PIXEL_ID?: string;
      NEXT_PUBLIC_LINKEDIN_PIXEL_ID?: string;
      NEXT_PUBLIC_GOOGLE_ADS_ID?: string;
      NEXT_PUBLIC_GOOGLE_ANALYTICS_ID?: string;
      NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID?: string;
      NEXT_PUBLIC_HOTJAR_ID?: string;
      NEXT_PUBLIC_HOTJAR_SNIPPET_VERSION?: string;
      NEXT_PUBLIC_INTERCOM_APP_ID?: string;
      NEXT_PUBLIC_AMPLITUDE_API_KEY?: string;
      NEXT_PUBLIC_SENTRY_DSN?: string;
      NEXT_PUBLIC_STRIPE_PUBLIC_KEY?: string;
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY?: string;
      NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN?: string;
      NEXT_PUBLIC_ALGOLIA_APP_ID?: string;
      NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY?: string;
      NEXT_PUBLIC_ALGOLIA_INDEX_NAME?: string;
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?: string;
      NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET?: string;
    }
  }

  // Extend the JSX namespace
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }

  // Global type for CSS modules
  type CSSModuleClasses = { readonly [key: string]: string };

  // Global type for SVG imports
  declare module '*.svg' {
    import * as React from 'react';
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }

  // Global type for image imports
  declare module '*.png' {
    const content: string;
    export default content;
  }

  declare module '*.jpg' {
    const content: string;
    export default content;
  }

  declare module '*.jpeg' {
    const content: string;
    export default content;
  }

  declare module '*.gif' {
    const content: string;
    export default content;
  }

  declare module '*.webp' {
    const content: string;
    export default content;
  }

  declare module '*.ico' {
    const content: string;
    export default content;
  }

  declare module '*.bmp' {
    const content: string;
    export default content;
  }

  // Global type for CSS modules with CSS modules
  declare module '*.module.css' {
    const classes: { readonly [key: string]: string };
    export default classes;
  }

  declare module '*.module.scss' {
    const classes: { readonly [key: string]: string };
    export default classes;
  }

  declare module '*.module.sass' {
    const classes: { readonly [key: string]: string };
    export default classes;
  }

  declare module '*.module.less' {
    const classes: { readonly [key: string]: string };
    export default classes;
  }

  declare module '*.module.styl' {
    const classes: { readonly [key: string]: string };
    export default classes;
  }

  // Global type for markdown files
  declare module '*.md' {
    const content: string;
    export default content;
  }

  // Global type for JSON files
  declare module '*.json' {
    const value: any;
    export default value;
  }

  // Global type for GraphQL files
  declare module '*.graphql' {
    import { DocumentNode } from 'graphql';
    const Schema: DocumentNode;
    export = Schema;
  }

  declare module '*.gql' {
    import { DocumentNode } from 'graphql';
    const Schema: DocumentNode;
    export = Schema;
  }
}

// Global utility types
type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type Maybe<T> = T | null | undefined;
type Dictionary<T> = { [key: string]: T };
type PartialRecord<K extends keyof any, T> = { [P in K]?: T };
type Mutable<T> = { -readonly [P in keyof T]: T[P] };
type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;
type DeepReadonly<T> = T extends object
  ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
  : T;
type DeepRequired<T> = T extends object
  ? { [P in keyof T]-?: DeepRequired<T[P]> }
  : T;
type DeepNullable<T> = T extends object
  ? { [P in keyof T]: DeepNullable<T[P]> | null }
  : T;
type DeepNonNullable<T> = T extends object
  ? { [P in keyof T]-?: NonNullable<T[P]> }
  : NonNullable<T>;
type DeepMutable<T> = T extends object
  ? { -readonly [P in keyof T]: DeepMutable<T[P]> }
  : T;
type DeepReadonlyArray<T> = ReadonlyArray<DeepReadonly<T>>;
type DeepReadonlyObject<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };
type DeepPartialArray<T> = Array<DeepPartial<T>>;
type DeepPartialObject<T> = { [K in keyof T]?: DeepPartial<T[K]> };
type DeepRequiredArray<T> = Array<DeepRequired<T>>;
type DeepRequiredObject<T> = { [K in keyof T]-?: DeepRequired<T[K]> };

// Global utility functions
declare function isDefined<T>(value: T | null | undefined): value is T;
declare function isNullOrUndefined<T>(
  value: T | null | undefined
): value is null | undefined;
declare function isNull<T>(value: T | null): value is null;
declare function isUndefined<T>(value: T | undefined): value is undefined;
declare function isNumber(value: unknown): value is number;
declare function isString(value: unknown): value is string;
declare function isBoolean(value: unknown): value is boolean;
declare function isObject(value: unknown): value is object;
declare function isFunction(value: unknown): value is Function;
declare function isArray(value: unknown): value is any[];
declare function isDate(value: unknown): value is Date;
declare function isRegExp(value: unknown): value is RegExp;
declare function isError(value: unknown): value is Error;
declare function isPromise<T = any>(value: unknown): value is Promise<T>;
declare function isIterable<T = any>(value: any): value is Iterable<T>;

// Global type guards
declare function isType<T>(
  value: any,
  type: 'string' | 'number' | 'boolean' | 'object' | 'function' | 'symbol' | 'bigint',
  // eslint-disable-next-line @typescript-eslint/ban-types
  ctor?: Function
): value is T;

// Global assertion functions
declare function assert(condition: any, message?: string): asserts condition;
declare function assertIsDefined<T>(
  value: T,
  message?: string
): asserts value is NonNullable<T>;
declare function assertNever(value: never, message?: string): never;

// Global utility types for React
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ReactFC<T = {}> = React.FunctionComponent<T>;
type ReactNode = React.ReactNode;
type ReactElement = React.ReactElement;
type ReactComponentType<T = any> = React.ComponentType<T>;
type ReactRef<T> = React.Ref<T>;
type ReactCSSProperties = React.CSSProperties;
type ReactHTMLAttributes<T> = React.HTMLAttributes<T>;
type ReactSVGAttributes<T> = React.SVGAttributes<T>;
type ReactInputHTMLAttributes<T> = React.InputHTMLAttributes<T>;
type ReactButtonHTMLAttributes<T> = React.ButtonHTMLAttributes<T>;
type ReactFormHTMLAttributes<T> = React.FormHTMLAttributes<T>;
type ReactImgHTMLAttributes<T> = React.ImgHTMLAttributes<T>;
type ReactAnchorHTMLAttributes<T> = React.AnchorHTMLAttributes<T>;
type ReactVideoHTMLAttributes<T> = React.VideoHTMLAttributes<T>;
type ReactAudioHTMLAttributes<T> = React.AudioHTMLAttributes<T>;
type ReactIframeHTMLAttributes<T> = React.IframeHTMLAttributes<T>;
type ReactCanvasHTMLAttributes<T> = React.CanvasHTMLAttributes<T>;
type ReactTableHTMLAttributes<T> = React.TableHTMLAttributes<T>;
type ReactColHTMLAttributes<T> = React.ColHTMLAttributes<T>;
type ReactTdHTMLAttributes<T> = React.TdHTMLAttributes<T>;
type ReactThHTMLAttributes<T> = React.ThHTMLAttributes<T>;
type ReactTextareaHTMLAttributes<T> = React.TextareaHTMLAttributes<T>;
type ReactSelectHTMLAttributes<T> = React.SelectHTMLAttributes<T>;
type ReactOptionHTMLAttributes<T> = React.OptionHTMLAttributes<T>;
type ReactFieldsetHTMLAttributes<T> = React.FieldsetHTMLAttributes<T>;
type ReactLabelHTMLAttributes<T> = React.LabelHTMLAttributes<T>;
type ReactOutputHTMLAttributes<T> = React.OutputHTMLAttributes<T>;
type ReactProgressHTMLAttributes<T> = React.ProgressHTMLAttributes<T>;
type ReactMeterHTMLAttributes<T> = React.MeterHTMLAttributes<T>;
type ReactTimeHTMLAttributes<T> = React.TimeHTMLAttributes<T>;
type ReactDataHTMLAttributes<T> = React.DataHTMLAttributes<T>;
type ReactMetaHTMLAttributes<T> = React.MetaHTMLAttributes<T>;
type ReactLinkHTMLAttributes<T> = React.LinkHTMLAttributes<T>;
type ReactBaseHTMLAttributes<T> = React.BaseHTMLAttributes<T>;
type ReactDialogHTMLAttributes<T> = React.DialogHTMLAttributes<T>;
type ReactMenuHTMLAttributes<T> = React.MenuHTMLAttributes<T>;
type ReactDetailsHTMLAttributes<T> = React.DetailsHTMLAttributes<T>;
type ReactDelHTMLAttributes<T> = React.DelHTMLAttributes<T>;
type ReactInsHTMLAttributes<T> = React.InsHTMLAttributes<T>;
type ReactQuoteHTMLAttributes<T> = React.QuoteHTMLAttributes<T>;
type ReactBlockquoteHTMLAttributes<T> = React.BlockquoteHTMLAttributes<T>;
type ReactPreHTMLAttributes<T> = React.PreHTMLAttributes<T>;
type ReactCodeHTMLAttributes<T> = React.CodeHTMLAttributes<T>;
type ReactKbdHTMLAttributes<T> = React.KbdHTMLAttributes<T>;
type ReactSampHTMLAttributes<T> = React.SampHTMLAttributes<T>;
type ReactVarHTMLAttributes<T> = React.VarHTMLAttributes<T>;
type ReactMarkHTMLAttributes<T> = React.MarkHTMLAttributes<T>;
type ReactTimeHTMLAttributes<T> = React.TimeHTMLAttributes<T>;

export {};
