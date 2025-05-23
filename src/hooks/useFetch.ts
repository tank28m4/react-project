import { useCallback } from 'react';

interface FetchOptions extends RequestInit {
  body?: any;
}

interface FetchResponse<T = any> {
  data: T;
  status: number;
}

interface LogEntry {
  url: string;
  requestTime: string;
  requestPayload: any;
  responseStatus?: number;
  responseTime: string;
  error?: string;
}

const useFetch = () => {
  const fetchWithLogger = useCallback(async <T = any>(url: string, options: FetchOptions = {}): Promise<FetchResponse<T>> => {
    const requestTime = new Date().toISOString();
    const requestPayload = options.body || null;
    
    try {
      const response = await fetch(url, options);
      const responseData = await response.json() as T;
      const responseStatus = response.status;
      
      const logEntry: LogEntry = {
        url,
        requestTime,
        requestPayload,
        responseStatus,
        responseTime: new Date().toISOString()
      };
      
      const existingLogs = JSON.parse(localStorage.getItem('apiLogs') || '[]') as LogEntry[];
      existingLogs.push(logEntry);
      localStorage.setItem('apiLogs', JSON.stringify(existingLogs));
      
      return { data: responseData, status: responseStatus };
    } catch (error) {
      const logEntry: LogEntry = {
        url,
        requestTime,
        requestPayload,
        error: error instanceof Error ? error.message : String(error),
        responseTime: new Date().toISOString()
      };
      
      const existingLogs = JSON.parse(localStorage.getItem('apiLogs') || '[]') as LogEntry[];
      existingLogs.push(logEntry);
      localStorage.setItem('apiLogs', JSON.stringify(existingLogs));
      
      throw error;
    }
  }, []);
  
  return { fetch: fetchWithLogger };
};

export default useFetch; 