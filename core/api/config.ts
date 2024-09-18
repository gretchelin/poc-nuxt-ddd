export const getAppConfig = async () => {
  const { apiBaseUrl } = useRuntimeConfig()?.public || {};
  const baseUrl = apiBaseUrl?.endsWith('/') ? apiBaseUrl : `${apiBaseUrl}/`;

  return useFetch(`${baseUrl}api/app-theme`);
};
