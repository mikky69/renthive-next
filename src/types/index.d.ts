// Re-export all type definitions
export * from './global';
export * from './next';
export * from './react';
export * from './node';

// Common types used across the application
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type OmitStrict<T, K extends keyof T> = Omit<T, K>;
export type PickStrict<T, K extends keyof T> = Pick<T, K>;

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
    code?: string | number;
    details?: any;
  };
  success: boolean;
}

// Pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Auth types
export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Property types
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  type: 'apartment' | 'house' | 'condo' | 'townhouse' | 'other';
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  yearBuilt: number;
  status: 'available' | 'rented' | 'maintenance' | 'unavailable';
  featured: boolean;
  images: string[];
  amenities: string[];
  createdAt: string;
  updatedAt: string;
  userId: string;
}

// Form types
export type FormFieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'switch';

export interface FormFieldOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  options?: FormFieldOption[];
  validation?: {
    pattern?: {
      value: RegExp;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
    min?: {
      value: number | string;
      message: string;
    };
    max?: {
      value: number | string;
      message: string;
    };
    validate?: (value: any) => string | boolean | Promise<string | boolean>;
  };
  defaultValue?: any;
  helperText?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  wrapperClassName?: string;
  render?: (props: any) => React.ReactNode;
}

// Component props
export interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  'data-testid'?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  role?: string;
  tabIndex?: number;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onClick?: (event: React.MouseEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onMouseDown?: (event: React.MouseEvent) => void;
  onMouseUp?: (event: React.MouseEvent) => void;
  onTouchStart?: (event: React.TouchEvent) => void;
  onTouchEnd?: (event: React.TouchEvent) => void;
  onTouchMove?: (event: React.TouchEvent) => void;
  onTouchCancel?: (event: React.TouchEvent) => void;
  onScroll?: (event: React.UIEvent) => void;
  onWheel?: (event: React.WheelEvent) => void;
  onContextMenu?: (event: React.MouseEvent) => void;
  onDoubleClick?: (event: React.MouseEvent) => void;
  onDrag?: (event: React.DragEvent) => void;
  onDragEnd?: (event: React.DragEvent) => void;
  onDragEnter?: (event: React.DragEvent) => void;
  onDragExit?: (event: React.DragEvent) => void;
  onDragLeave?: (event: React.DragEvent) => void;
  onDragOver?: (event: React.DragEvent) => void;
  onDragStart?: (event: React.DragEvent) => void;
  onDrop?: (event: React.DragEvent) => void;
  onMouseMove?: (event: React.MouseEvent) => void;
  onMouseOut?: (event: React.MouseEvent) => void;
  onMouseOver?: (event: React.MouseEvent) => void;
  onSelect?: (event: React.SyntheticEvent) => void;
  onAnimationStart?: (event: React.AnimationEvent) => void;
  onAnimationEnd?: (event: React.AnimationEvent) => void;
  onAnimationIteration?: (event: React.AnimationEvent) => void;
  onTransitionEnd?: (event: React.TransitionEvent) => void;
  onLoad?: (event: React.SyntheticEvent) => void;
  onError?: (event: React.SyntheticEvent) => void;
  onAbort?: (event: React.SyntheticEvent) => void;
  onCanPlay?: (event: React.SyntheticEvent) => void;
  onCanPlayThrough?: (event: React.SyntheticEvent) => void;
  onDurationChange?: (event: React.SyntheticEvent) => void;
  onEmptied?: (event: React.SyntheticEvent) => void;
  onEncrypted?: (event: React.SyntheticEvent) => void;
  onEnded?: (event: React.SyntheticEvent) => void;
  onLoadedData?: (event: React.SyntheticEvent) => void;
  onLoadedMetadata?: (event: React.SyntheticEvent) => void;
  onLoadStart?: (event: React.SyntheticEvent) => void;
  onPause?: (event: React.SyntheticEvent) => void;
  onPlay?: (event: React.SyntheticEvent) => void;
  onPlaying?: (event: React.SyntheticEvent) => void;
  onProgress?: (event: React.SyntheticEvent) => void;
  onRateChange?: (event: React.SyntheticEvent) => void;
  onSeeked?: (event: React.SyntheticEvent) => void;
  onSeeking?: (event: React.SyntheticEvent) => void;
  onStalled?: (event: React.SyntheticEvent) => void;
  onSuspend?: (event: React.SyntheticEvent) => void;
  onTimeUpdate?: (event: React.SyntheticEvent) => void;
  onVolumeChange?: (event: React.SyntheticEvent) => void;
  onWaiting?: (event: React.SyntheticEvent) => void;
  onCopy?: (event: React.ClipboardEvent) => void;
  onCut?: (event: React.ClipboardEvent) => void;
  onPaste?: (event: React.ClipboardEvent) => void;
  onCompositionEnd?: (event: React.CompositionEvent) => void;
  onCompositionStart?: (event: React.CompositionEvent) => void;
  onCompositionUpdate?: (event: React.CompositionEvent) => void;
  onFocusIn?: (event: React.FocusEvent) => void;
  onFocusOut?: (event: React.FocusEvent) => void;
  onAuxClick?: (event: React.MouseEvent) => void;
  onGotPointerCapture?: (event: React.PointerEvent) => void;
  onLostPointerCapture?: (event: React.PointerEvent) => void;
  onPointerCancel?: (event: React.PointerEvent) => void;
  onPointerDown?: (event: React.PointerEvent) => void;
  onPointerEnter?: (event: React.PointerEvent) => void;
  onPointerLeave?: (event: React.PointerEvent) => void;
  onPointerMove?: (event: React.PointerEvent) => void;
  onPointerOut?: (event: React.PointerEvent) => void;
  onPointerOver?: (event: React.PointerEvent) => void;
  onPointerUp?: (event: React.PointerEvent) => void;
  onResize?: (event: React.SyntheticEvent) => void;
  onScroll?: (event: React.UIEvent) => void;
  onWheel?: (event: React.WheelEvent) => void;
}

// Theme types
export type ThemeMode = 'light' | 'dark' | 'system';

export interface Theme {
  mode: ThemeMode;
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    background: {
      default: string;
      paper: string;
      secondary: string;
    };
    text: {
      primary: string;
      secondary: string;
      disabled: string;
      hint: string;
    };
    divider: string;
    border: string;
  };
  typography: {
    fontFamily: string;
    fontSize: number;
    fontWeightLight: number;
    fontWeightRegular: number;
    fontWeightMedium: number;
    fontWeightBold: number;
    h1: {
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
    };
    h2: {
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
    };
    h3: {
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
    };
    h4: {
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
    };
    h5: {
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
    };
    h6: {
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
    };
    subtitle1: {
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
    };
    subtitle2: {
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
    };
    body1: {
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
    };
    body2: {
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
    };
    button: {
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
      textTransform: string;
    };
    caption: {
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
    };
    overline: {
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
      textTransform: string;
    };
  };
  shape: {
    borderRadius: number;
  };
  shadows: string[];
  transitions: {
    duration: {
      shortest: number;
      shorter: number;
      short: number;
      standard: number;
      complex: number;
      enteringScreen: number;
      leavingScreen: number;
    };
    easing: {
      easeInOut: string;
      easeOut: string;
      easeIn: string;
      sharp: string;
    };
  };
  zIndex: {
    mobileStepper: number;
    speedDial: number;
    appBar: number;
    drawer: number;
    modal: number;
    snackbar: number;
    tooltip: number;
  };
  spacing: (factor: number) => string;
  breakpoints: {
    keys: string[];
    values: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
    up: (key: string | number) => string;
    down: (key: string | number) => string;
    between: (start: string | number, end: string | number) => string;
    only: (key: string) => string;
    width: (key: string) => number;
  };
  mixins: {
    toolbar: {
      minHeight: number;
      '@media (min-width:0px) and (orientation: landscape)': {
        minHeight: number;
      };
      '@media (min-width:600px)': {
        minHeight: number;
      };
    };
  };
  components?: Record<string, any>;
}
