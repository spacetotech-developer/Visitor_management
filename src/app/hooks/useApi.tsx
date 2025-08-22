// hooks/useApi.ts (or wherever your hook is defined)

import { useState, useCallback } from 'react';
import { apiService,RequestOptions } from '../utils/apiService';

type ApiFunction<T> = (
  endpoint: string,
  options?: RequestOptions
) => Promise<T>;

export function useApi<T>() {
  const [loading, setLoading] = useState(false);

  const callApi = useCallback(async (endpoint: string, options?: RequestOptions) => {
    setLoading(true);
    console.log('endpoint',endpoint,"option>>",options);
    try {
      const data = await apiService<T>(endpoint, options);
      return { data, error: null };
    } catch (err:any) {
      const message = err?.message || 'API error';
      return { data: null, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  return { callApi, loading};
}
