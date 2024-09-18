import { http, HttpResponse, passthrough } from 'msw';

const config = useRuntimeConfig();
const { apiBaseUrl } = config?.public || {};
const baseUrl = apiBaseUrl?.endsWith('/') ? apiBaseUrl : `${apiBaseUrl}/`;

export default [
  http.get(`${baseUrl}api/app-theme`, async () => {
    const mockNamespace = new URLSearchParams(window.location.search).get('mock')?.split(',') || [];
    // only mock if there is a mock query param with `auth` as value
    if (mockNamespace?.includes('config')) {
      const json = {
        success: true,
        status_code: 200,
        data: {
          primary_color: '#da4a4a',
          secondary_color: '#000b42',
          text_color: '#000320',
        },
      };

      return HttpResponse.json(json);
    }

    // skip mocking and do the request as-is
    return passthrough();
  }),
];
