// import {NEXT_PUBLIC_API_BASE_URL} from '../config/config';
// export type RequestOptions = {
//   method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
//   headers?: Record<string, string>;
//   body?: any;
//   cache?: RequestCache;
//   next?: NextFetchRequestConfig;
// };

// export async function apiService<T>(
//   endpoint: string,
//   options: RequestOptions = {}
// ): Promise<T> {
//   const liveserver = true;
//   const baseUrl = liveserver ? NEXT_PUBLIC_API_BASE_URL : 'http://localhost:3001/api/v1';
//   const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
//   const url = `${baseUrl}${normalizedEndpoint}`;

//   const isFormData = options.body instanceof FormData;

//   const headers = new Headers();

//   // Only set Content-Type if not FormData
//   if (!isFormData) {
//     headers.set('Content-Type', 'application/json');
//   }

//   // Add auth token from cookies
//   if (typeof document !== 'undefined') {
//     const cookieValue = document.cookie
//       .split('; ')
//       .find(row => row.startsWith('token='))
//       ?.split('=')[1];
//     if (cookieValue) {
//       headers.set('Authorization', `Bearer ${cookieValue}`);
//     }
//   }

//   const config: RequestInit = {
//     method: options.method || 'GET',
//     headers,
//     cache: options.cache,
//     next: options.next,
//     body: isFormData ? options.body : JSON.stringify(options.body),
//   };
//    try {
//     const response = await fetch(url, config);

//     const contentType = response.headers.get('Content-Type');
//     const isJson = contentType?.includes('application/json');

//     if (!response.ok) {
//       const errorBody = isJson ? await response.json() : { message: response.statusText };

//       const error = new Error(
//         errorBody?.message ||
//           errorBody?.ValidationErrors?.join(', ') ||
//           `HTTP error! status: ${response.status}`
//       );

//       // attach structured data to error object
//       (error as any).data = errorBody;

//       throw error;
//     }

//     return isJson ? ((await response.json()) as T) : (await response.text() as unknown as T);
//   } catch (error) {
//     throw error;
//   }
// }

import { NEXT_PUBLIC_API_BASE_URL, BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD } from '../config/config';

export type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  usePublic?: boolean; // ✅ Basic Auth flag
};

// -------------------------------
// Token Storage Helpers
// -------------------------------
// let accessToken: string = '';

// if (typeof window !== 'undefined') {
//   accessToken = localStorage.getItem('data') || '';
// }

let accessToken: string = '';

if (typeof window !== 'undefined') {
  accessToken = localStorage.getItem('accessToken') || '';  // ✅ use correct key
}

export const setTokens = (newAccessToken: string) => {
  accessToken = newAccessToken;
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', newAccessToken);
  }
};

export const clearTokens = () => {
  accessToken = '';
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  }
};

// -------------------------------
// API Service
// -------------------------------
export async function apiService<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const liveserver = true;
  const baseUrl = liveserver ? NEXT_PUBLIC_API_BASE_URL : 'http://localhost:3001/api/v1';
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${normalizedEndpoint}`;

  const isFormData = options.body instanceof FormData;
  const headers = new Headers();

  if (!isFormData) {
    headers.set('Content-Type', 'application/json');
  }

  // Public Auth (Basic)
  if (options.usePublic) {
    console.log('Using Basic Auth:');
    const basicAuth = btoa(`${BASIC_AUTH_USERNAME}:${BASIC_AUTH_PASSWORD}`);
    headers.set('Authorization', `Basic ${basicAuth}`);
  }

  // Private Auth (Bearer from localStorage)
  else if (accessToken) {
    console.log('Using access token:', accessToken);
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const config: RequestInit = {
    method: options.method || 'GET',
    headers,
    cache: options.cache,
    next: options.next,
    body: isFormData ? options.body : JSON.stringify(options.body),
  };

  try {
    const response = await fetch(url, config);
    console.log('API Response:', response);
    const contentType = response.headers.get('Content-Type');
    const isJson = contentType?.includes('application/json');

    if (!response.ok) {
      const errorBody = isJson ? await response.json() : { message: response.statusText };
      const error = new Error(
        errorBody?.message ||
          errorBody?.ValidationErrors?.join(', ') ||
          `HTTP error! status: ${response.status}`
      );
      (error as any).data = errorBody;
      throw error;
    }

    return isJson ? ((await response.json()) as T) : ((await response.text()) as unknown as T);
  } catch (error) {
    throw error;
  }
}

