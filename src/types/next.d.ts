import { GetStaticProps, GetStaticPaths, GetServerSideProps, NextPage, NextComponentType, NextPageContext, NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { AppProps, AppContext, AppInitialProps, AppPropsType, AppType } from 'next/app';
import { Router, useRouter } from 'next/router';
import { NextRouter } from 'next/router';
import { NextPageWithLayout, AppPropsWithLayout } from 'next/app';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { ParsedUrlQuery } from 'querystring';
import { IncomingMessage, ServerResponse } from 'http';
import { StaticImageData } from 'next/image';

// Extend the Next.js App component
declare module 'next/app' {
  export * from 'next/dist/shared/lib/utils';
  
  export type AppProps<P = Record<string, unknown>> = {
    Component: NextComponentType<NextPageContext, any, P>;
    router: Router;
    __N_SSG?: boolean;
    __N_SSP?: boolean;
    pageProps: P;
  };

  export type AppContext = {
    Component: NextComponentType<NextPageContext>;
    AppTree: any;
    ctx: NextPageContext;
  };

  export type AppInitialProps<P = Record<string, unknown>> = {
    pageProps: P;
  };

  export type AppPropsType<R extends NextRouter = NextRouter, P = {}> = {
    Component: NextComponentType<NextPageContext, any, P>;
    router: R;
    __N_SSG?: boolean;
    __N_SSP?: boolean;
    pageProps: P;
  };

  export type AppType<P = {}> = NextComponentType<
    NextPageContext,
    AppInitialProps<P>,
    AppPropsType<NextRouter, P>
  >;

  export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
  };

  export type AppPropsWithLayout<P = {}> = AppProps & {
    Component: NextComponentType<NextPageContext, any, P> & {
      getLayout?: (page: ReactElement) => ReactNode;
    };
    pageProps: P;
  };
}

// Extend the Next.js Document component
declare module 'next/document' {
  import { DocumentContext, DocumentInitialProps, DocumentProps } from 'next/document';
  import { Html, Head, Main, NextScript } from 'next/document';
  
  export * from 'next/document';
  
  export type DocumentContext = DocumentContext;
  export type DocumentInitialProps = DocumentInitialProps;
  export type DocumentProps = DocumentProps;
  
  export { Html, Head, Main, NextScript };
  
  export default class Document extends React.Component<DocumentProps> {
    static getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps>;
    render(): JSX.Element;
  }
}

// Extend the Next.js Image component
declare module 'next/image' {
  import { ImgHTMLAttributes, CSSProperties } from 'react';
  
  export interface StaticImageData {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
    blurWidth?: number;
    blurHeight?: number;
  }
  
  export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'placeholder' | 'onLoadingComplete'> {
    src: string | StaticImageData;
    width: number;
    height: number;
    alt: string;
    loader?: (resolverProps: ImageLoaderProps) => string;
    quality?: number | string;
    priority?: boolean;
    loading?: 'lazy' | 'eager';
    lazyBoundary?: string;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    unoptimized?: boolean;
    objectFit?: CSSProperties['objectFit'];
    objectPosition?: CSSProperties['objectPosition'];
    onLoadingComplete?: (result: { naturalWidth: number; naturalHeight: number }) => void;
    onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
    onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
    onLoadingComplete?: (result: { naturalWidth: number; naturalHeight: number }) => void;
    draggable?: boolean;
  }
  
  export interface ImageLoaderProps {
    src: string;
    width: number;
    quality?: number;
  }
  
  export default function Image(props: ImageProps): JSX.Element;
  
  export const unstable_getImgProps: ({
    src,
    width,
    quality,
    ...rest
  }: {
    src: string | StaticImageData;
    width: number;
    quality?: number | undefined;
    [x: string]: any;
  }) => {
    src: string;
    srcSet: string;
    sizes?: string | undefined;
    style: CSSProperties;
  };
}

// Extend the Next.js Head component
declare module 'next/head' {
  import { HeadProps } from 'next/head';
  
  export * from 'next/head';
  
  export default function Head(props: HeadProps): JSX.Element;
}

// Extend the Next.js Link component
declare module 'next/link' {
  import { LinkProps as NextLinkProps } from 'next/link';
  
  export * from 'next/link';
  
  export interface LinkProps extends Omit<NextLinkProps, 'passHref' | 'as' | 'onError' | 'onClick'> {
    children: ReactNode;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    locale?: string | false;
    legacyBehavior?: boolean;
    onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>;
    onTouchStart?: React.TouchEventHandler<HTMLAnchorElement>;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  }
  
  export default function Link(props: React.PropsWithChildren<LinkProps>): JSX.Element;
}

// Extend the Next.js Router
declare module 'next/router' {
  import { NextRouter } from 'next/dist/shared/lib/router/router';
  
  export * from 'next/dist/shared/lib/router';
  
  export function useRouter(): NextRouter;
  export function withRouter<T extends {}>(
    Component: React.ComponentType<T & { router: NextRouter }>
  ): React.ComponentType<T>;
  
  export interface NextRouter extends NextRouter {
    events: {
      on: (event: string, callback: (url: string) => void) => void;
      off: (event: string, callback: (url: string) => void) => void;
      emit: (event: string, ...args: any[]) => void;
    };
  }
}

// Extend the Next.js API routes
declare module 'next' {
  export interface NextApiRequest extends IncomingMessage {
    cookies: NextApiRequestCookies;
    query: Partial<{ [key: string]: string | string[] }>;
    body: any;
    env: NodeJS.ProcessEnv;
    preview?: boolean;
    previewData?: any;
  }
  
  export interface NextApiResponse<T = any> extends ServerResponse {
    status: (statusCode: number) => NextApiResponse<T>;
    json: (body: T) => void;
    send: (body: any) => void;
    redirect: (statusOrUrl: string | number, url?: string) => void;
    setPreviewData: (data: any, options?: {
      maxAge?: number;
      path?: string;
    }) => void;
    clearPreviewData: (options?: { path?: string }) => void;
    unstable_revalidate: (urlPath: string, opts?: {
      unstable_onlyGenerated?: boolean;
    }) => Promise<void>;
  }
  
  export type NextApiHandler<T = any> = (
    req: NextApiRequest,
    res: NextApiResponse<T>
  ) => void | Promise<void>;
  
  export interface GetStaticPropsContext<P extends ParsedUrlQuery = ParsedUrlQuery> {
    params?: P;
    preview?: boolean;
    previewData?: any;
    locale?: string;
    locales?: string[];
    defaultLocale?: string;
  }
  
  export interface GetStaticPathsContext {
    locales?: string[];
    defaultLocale?: string;
  }
  
  export interface GetServerSidePropsContext<P extends ParsedUrlQuery = ParsedUrlQuery> {
    req: IncomingMessage & { cookies: NextApiRequestCookies };
    res: ServerResponse;
    params?: P;
    query: ParsedUrlQuery;
    preview?: boolean;
    previewData?: any;
    resolvedUrl: string;
    locale?: string;
    locales?: string[];
    defaultLocale?: string;
  }
  
  export type GetStaticPropsResult<P> =
    | { props: P; revalidate?: number | boolean }
    | { redirect: { destination: string; permanent: boolean } }
    | { notFound: true };
    
  export type GetServerSidePropsResult<P> =
    | { props: P | Promise<P> }
    | { redirect: { destination: string; permanent: boolean } }
    | { notFound: true };
    
  export type GetStaticProps<P = any, Q extends ParsedUrlQuery = ParsedUrlQuery> = (
    context: GetStaticPropsContext<Q>
  ) => Promise<GetStaticPropsResult<P>> | GetStaticPropsResult<P>;
  
  export type GetStaticPaths<P extends ParsedUrlQuery = ParsedUrlQuery> = (
    context: GetStaticPathsContext
  ) => Promise<{
    paths: Array<string | { params: P; locale?: string }>;
    fallback: boolean | 'blocking';
  }> | { paths: string[]; fallback: boolean };
  
  export type GetServerSideProps<P = any, Q extends ParsedUrlQuery = ParsedUrlQuery> = (
    context: GetServerSidePropsContext<Q>
  ) => Promise<GetServerSidePropsResult<P>>;
}

// Image file type declarations
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare module '*.png' {
  const content: StaticImageData;
  export default content;
}

declare module '*.jpg' {
  const content: StaticImageData;
  export default content;
}

declare module '*.jpeg' {
  const content: StaticImageData;
  export default content;
}

declare module '*.gif' {
  const content: StaticImageData;
  export default content;
}

declare module '*.webp' {
  const content: StaticImageData;
  export default content;
}

declare module '*.ico' {
  const content: StaticImageData;
  export default content;
}

declare module '*.bmp' {
  const content: StaticImageData;
  export default content;
}
