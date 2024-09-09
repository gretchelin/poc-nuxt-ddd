// This file is to store utility functions related to mocking api calls
import { http, HttpResponse } from 'msw';

// Utility to mock OPTIONS request
// (this might be needed when mocking POST call to ensure POST mock is not prematurely failed
// due to OPTIONS call errored out because server is not accessible)
export const mockOptionsCall = (url: string, status: number = 200) =>
  http.options<Record<string, any>, Record<string, any>>(
    url,
    () => {
      return new HttpResponse(null, {
        status: status || 200,
      });
    },
  );
