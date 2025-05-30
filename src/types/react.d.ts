import * as React from 'react';
import { Link } from 'next/link';

// Augment React types
declare global {
  namespace React {
    // Basic React types
    type ReactNode = any;
    type ReactElement = any;
    type FC<P = {}> = React.FunctionComponent<P>;
    type ForwardRefExoticComponent<T> = any;
    type RefAttributes<T> = any;
    type ComponentType<P = {}> = any;
    
    // Hooks
    function useState<S>(initialState: S | (() => S)): [S, React.Dispatch<React.SetStateAction<S>>];
    function useEffect(effect: () => void | (() => void), deps?: React.DependencyList): void;
    function useContext<T>(context: React.Context<T>): T;
    function useRef<T>(initialValue: T): React.MutableRefObject<T>;
    function useCallback<T extends (...args: any[]) => any>(callback: T, deps: React.DependencyList): T;
    function useMemo<T>(factory: () => T, deps: React.DependencyList | undefined): T;
    
    // Event Handlers
    type MouseEventHandler<T = Element> = (event: MouseEvent<T>) => void;
    type TouchEventHandler<T = Element> = (event: TouchEvent<T>) => void;
    type KeyboardEventHandler<T = Element> = (event: KeyboardEvent<T>) => void;
    
    // Event Types
    interface MouseEvent<T = Element> extends UIEvent<T, NativeMouseEvent> {
      altKey: boolean;
      button: number;
      buttons: number;
      clientX: number;
      clientY: number;
      ctrlKey: boolean;
      metaKey: boolean;
      pageX: number;
      pageY: number;
      relatedTarget: EventTarget | null;
      screenX: number;
      screenY: number;
      shiftKey: boolean;
    }

    interface TouchEvent<T = Element> extends UIEvent<T, NativeTouchEvent> {
      altKey: boolean;
      changedTouches: TouchList;
      ctrlKey: boolean;
      metaKey: boolean;
      shiftKey: boolean;
      targetTouches: TouchList;
      touches: TouchList;
    }

    interface KeyboardEvent<T = Element> extends UIEvent<T, NativeKeyboardEvent> {
      altKey: boolean;
      char: string;
      code: string;
      ctrlKey: boolean;
      key: string;
      keyCode: number;
      locale: string;
      location: number;
      metaKey: boolean;
      repeat: boolean;
      shiftKey: boolean;
    }

    interface UIEvent<T = Element, E = NativeUIEvent> extends SyntheticEvent<T, E> {
      detail: number;
      view: AbstractView;
    }

    interface SyntheticEvent<T = Element, E = Event> extends BaseSyntheticEvent<E, EventTarget & T, EventTarget> {}

    interface BaseSyntheticEvent<E = object, C = any, T = any> {
      nativeEvent: E;
      currentTarget: C;
      target: T;
      bubbles: boolean;
      cancelable: boolean;
      defaultPrevented: boolean;
      eventPhase: number;
      isTrusted: boolean;
      preventDefault(): void;
      isDefaultPrevented(): boolean;
      stopPropagation(): void;
      isPropagationStopped(): boolean;
      persist(): void;
      timeStamp: number;
      type: string;
    }
  }

  // Next.js Link component types
  namespace NextJS {
    interface LinkProps {
      href: string | { pathname: string; query?: Record<string, any>; hash?: string; };
      as?: string;
      replace?: boolean;
      scroll?: boolean;
      shallow?: boolean;
      passHref?: boolean;
      prefetch?: boolean;
      locale?: string | false;
      className?: string;
      style?: React.CSSProperties;
      children?: React.ReactNode;
    }
  }
}

// Next.js Link module declaration
declare module 'next/link' {
  export default Link;
  export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string | { pathname: string; query?: Record<string, any>; hash?: string; };
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    locale?: string | false;
  }
}

// Global HTML attributes
declare global {
  interface HTMLAttributes<T> extends React.AriaAttributes, React.DOMAttributes<T> {
    // Standard HTML Attributes
    accessKey?: string;
    className?: string;
    contentEditable?: Booleanish | 'inherit';
    contextMenu?: string;
    dir?: string;
    draggable?: Booleanish;
    hidden?: boolean;
    id?: string;
    lang?: string;
    placeholder?: string;
    slot?: string;
    spellCheck?: Booleanish;
    style?: CSSProperties;
    tabIndex?: number;
    title?: string;
    translate?: 'yes' | 'no';
    
    // Unknown
    radioGroup?: string;
    
    // WAI-ARIA
    role?: string;
    
    // RDFa Attributes
    about?: string;
    datatype?: string;
    inlist?: any;
    prefix?: string;
    property?: string;
    resource?: string;
    typeof?: string;
    vocab?: string;
    
    // Non-standard Attributes
    autoCapitalize?: string;
    autoCorrect?: string;
    autoSave?: string;
    color?: string;
    itemProp?: string;
    itemScope?: boolean;
    itemType?: string;
    itemID?: string;
    itemRef?: string;
    results?: number;
    security?: string;
    unselectable?: 'on' | 'off';
    
    // Living Standard
    /**
     * Hints at the type of data that might be entered by the user while editing the element or its contents
     * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
     */
    inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
    /**
     * Specify that a standard HTML element should behave like a defined custom built-in element
     * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
     */
    is?: string;
  }
  
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
  
  interface SVGProps<T> extends HTMLAttributes<T> {
    width?: number | string;
    height?: number | string;
    viewBox?: string;
    xmlns?: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number | string;
    strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit';
    strokeLinejoin?: 'miter' | 'round' | 'bevel' | 'inherit';
    strokeMiterlimit?: number | string;
    strokeDasharray?: string | number;
    strokeDashoffset?: string | number;
    strokeOpacity?: number | string;
    fillOpacity?: number | string;
    fillRule?: 'nonzero' | 'evenodd' | 'inherit';
    clipRule?: number | string;
    opacity?: number | string;
    color?: string;
    colorInterpolation?: number | string;
    colorRendering?: number | string;
    cursor?: number | string;
    display?: string;
    visibility?: 'visible' | 'hidden' | 'collapse';
    pointerEvents?: string;
  }
}

type Booleanish = boolean | 'true' | 'false';
