import { useCallback } from 'react';

const useFetch = () => {
  const fetchWithLogger = useCallback(async (url, options = {}) => {
    const requestTime = new Date().toISOString();
    const requestPayload = options.body || null;
    
    try {
      const response = await fetch(url, options);
      const responseData = await response.json();
      const responseStatus = response.status;
      
      const logEntry = {
        url,
        requestTime,
        requestPayload,
        responseStatus,
        responseTime: new Date().toISOString()
      };
      
      const existingLogs = JSON.parse(localStorage.getItem('apiLogs') || '[]');
      existingLogs.push(logEntry);
      localStorage.setItem('apiLogs', JSON.stringify(existingLogs));
      
      return { data: responseData, status: responseStatus };
    } catch (error) {
      const logEntry = {
        url,
        requestTime,
        requestPayload,
        error: error.message,
        responseTime: new Date().toISOString()
      };
      
      const existingLogs = JSON.parse(localStorage.getItem('apiLogs') || '[]');
      existingLogs.push(logEntry);
      localStorage.setItem('apiLogs', JSON.stringify(existingLogs));
      
      throw error;
    }
  }, []);
  
  return { fetch: fetchWithLogger };
};

export default useFetch; 