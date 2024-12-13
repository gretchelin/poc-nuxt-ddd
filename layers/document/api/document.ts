const serialize = function (obj) {
  const str = [];
  for (const p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
};

export const getDocumentList = async (params = {}) => {
  const authCookie = useCookie('token');
  const env = useRuntimeConfig();

  const token = authCookie?.value;
  return await $fetch(`${env.public.apiBaseUrl}cms/v2/files/upload?${serialize(params)}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const createDocument = async (data: { title: string; description: string; thumbnail: string; file: string }) => {
  const authCookie = useCookie('token');
  const env = useRuntimeConfig();

  const token = authCookie?.value;
  return await useFetch(`${env.public.apiBaseUrl}cms/v2/files/upload`, {
    headers: {
      Authorization: token,
    },
    method: 'post',
    body: data,
  });
};

export const deleteDocument = async (id: number) => {
  const authCookie = useCookie('token');
  const env = useRuntimeConfig();

  const token = authCookie?.value;
  return await useFetch(`${env.public.apiBaseUrl}cms/v2/files/upload/${id}`, {
    headers: {
      Authorization: token,
    },
    method: 'delete',
  });
};

export const upload = async (formData) => {
  const authCookie = useCookie('token');
  const env = useRuntimeConfig();
  const token = authCookie?.value;
  return await useFetch(`${env.public.storageBaseUrl}upload`, {
    headers: {
      Authorization: token,
    },
    method: 'post',
    body: formData,
  });
};

export const getDocumentById = async (id) => {
  const authCookie = useCookie('token');
  const env = useRuntimeConfig();

  const token = authCookie?.value;
  return await $fetch(`${env.public.apiBaseUrl}cms/v2/files/upload/${id}`, {
    headers: {
      Authorization: token,
    },
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
