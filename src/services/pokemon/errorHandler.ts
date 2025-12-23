import axios, { AxiosError } from 'axios';

const formatServerError = (status: number, statusText: string): string => {
  return `Error ${status}: ${statusText}`;
};

const formatNetworkError = (): string => {
  return 'Network error: No response from server';
};

const formatRequestError = (message: string): string => {
  return `Request error: ${message}`;
};

const formatUnknownError = (): string => {
  return 'Unknown error occurred';
};

const handleAxiosError = (error: AxiosError): string => {
  if (error.response) {
    return formatServerError(error.response.status, error.response.statusText);
  }
  
  if (error.request) {
    return formatNetworkError();
  }
  
  return formatRequestError(error.message);
};

export const handleError = (error: unknown): string => {
  if (!axios.isAxiosError(error)) {
    return formatUnknownError();
  }
  
  return handleAxiosError(error as AxiosError);
};
