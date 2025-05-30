import { useState, useCallback, useMemo } from 'react';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  request: (url: string, method: HttpMethod, body?: any, headers?: HeadersInit) => Promise<T>;
  setData: (data: T | null) => void;
  setError: (error: string | null) => void;
}

interface UseApiOptions<T> {
  initialData?: T | null;
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

export const useApi = <T,>(options: UseApiOptions<T> = {}) => {
  const [state, setState] = useState<Omit<ApiResponse<T>, 'request' | 'setData' | 'setError'>>({
    data: options.initialData || null,
    error: null,
    loading: false,
  });

  const request = useCallback(
    async (
      url: string,
      method: HttpMethod = 'GET',
      body?: any,
      headers: HeadersInit = {}
    ): Promise<T> => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const config: RequestInit = {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
        };

        if (body && method !== 'GET') {
          config.body = JSON.stringify(body);
        }


        const response = await fetch(url, config);
        let responseData;
        
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          responseData = await response.json();
        } else {
          responseData = await response.text();
        }

        if (!response.ok) {
          const errorMessage = 
            (typeof responseData === 'object' && responseData !== null && 'message' in responseData)
              ? String((responseData as any).message)
              : 'Something went wrong';
          throw new Error(errorMessage);
        }

        setState(prev => ({
          ...prev,
          data: responseData,
          loading: false,
        }));

        if (options.onSuccess) {
          options.onSuccess(responseData);
        }

        return responseData;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        
        setState(prev => ({
          ...prev,
          error: errorMessage,
          loading: false,
        }));

        if (options.onError) {
          options.onError(errorMessage);
        }

        throw error;
      }
    },
    [options.onSuccess, options.onError]
  );

  const setData = useCallback((data: T | null) => {
    setState(prev => ({ ...prev, data }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  return useMemo(() => ({
    ...state,
    request,
    setData,
    setError,
  }), [state, request, setData, setError]);
};

// GET hook
export const useGet = <T,>(url: string, deps: any[] = []) => {
  const { request, ...state } = useApi<T>();
  
  const get = useCallback(async (queryParams?: Record<string, string>) => {
    const queryString = queryParams ? `?${new URLSearchParams(queryParams).toString()}` : '';
    return request(`${url}${queryString}`, 'GET');
  }, [url, ...deps]);

  return { ...state, get };
};

// POST hook
export const usePost = <T,>() => {
  const { request, ...state } = useApi<T>();
  
  const post = useCallback(async (url: string, data: any, headers?: HeadersInit) => {
    return request(url, 'POST', data, headers);
  }, [request]);

  return { ...state, post };
};

// PUT hook
export const usePut = <T,>() => {
  const { request, ...state } = useApi<T>();
  
  const put = useCallback(async (url: string, data: any, headers?: HeadersInit) => {
    return request(url, 'PUT', data, headers);
  }, [request]);

  return { ...state, put };
};

// PATCH hook
export const usePatch = <T,>() => {
  const { request, ...state } = useApi<T>();
  
  const patch = useCallback(async (url: string, data: any, headers?: HeadersInit) => {
    return request(url, 'PATCH', data, headers);
  }, [request]);

  return { ...state, patch };
};

// DELETE hook
export const useDelete = <T,>() => {
  const { request, ...state } = useApi<T>();
  
  const del = useCallback(async (url: string, headers?: HeadersInit) => {
    return request(url, 'DELETE', undefined, headers);
  }, [request]);

  return { ...state, delete: del };
};
