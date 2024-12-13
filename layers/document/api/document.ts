import { AUTH_COOKIE_NAME } from '~/layers/auth/config/constants';

const getHeaders = () => {
  const authCookie = useCookie(AUTH_COOKIE_NAME);
  const token = authCookie?.value;

  const headers: HeadersInit = token ? { Authorization: token } : {};

  return headers;
};

const serialize = function (obj) {
  const str = [];
  for (const p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
};

export const getDocumentList = async (params = {}) => {
  const env = useRuntimeConfig();
  const headers = getHeaders();

  return await $fetch(`${env.public.apiBaseUrl}cms/v2/files/upload?${serialize(params)}`, {
    headers,
  });
};

export const createDocument = async (data: { title: string; description: string; thumbnail: string; file: string }) => {
  const env = useRuntimeConfig();
  const headers = getHeaders();

  return await useFetch(`${env.public.apiBaseUrl}cms/v2/files/upload`, {
    headers,
    method: 'post',
    body: data,
  });
};

export const deleteDocument = async (id: number) => {
  const env = useRuntimeConfig();
  const headers = getHeaders();

  return await useFetch(`${env.public.apiBaseUrl}cms/v2/files/upload/${id}`, {
    headers,
    method: 'delete',
  });
};

export const upload = async (formData) => {
  const env = useRuntimeConfig();
  const headers = getHeaders();

  return await useFetch(`${env.public.storageBaseUrl}upload`, {
    headers,
    method: 'post',
    body: formData,
  });
};

export const getDocumentById = async (id: number) => {
  const env = useRuntimeConfig();
  const headers = getHeaders();

  return await $fetch(`${env.public.apiBaseUrl}cms/v2/files/upload/${id}`, {
    headers,
  });
};

export const editDocument = async (data: { title: string; description: string; thumbnail: string; file: string }, id: number) => {
  const env = useRuntimeConfig();
  const headers = getHeaders();

  return await useFetch(`${env.public.apiBaseUrl}cms/v2/files/upload/${id}`, {
    headers,
    method: 'patch',
    body: data,
  });
};

export const editDocument = async (data: { title: string; description: string; thumbnail: string; file: string }, id: number) => {
  const authCookie = useCookie('token');
  const env = useRuntimeConfig();

  const token = authCookie?.value;
  return await useFetch(`${env.public.apiBaseUrl}cms/v2/files/upload/${id}`, {
    headers: {
      Authorization: token,
    },
    method: 'patch',
    body: data,
  });
};
