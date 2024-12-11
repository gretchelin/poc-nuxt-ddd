// TODO: will be set globally
export const getDocumentList = async (options = {}) => {
  const authCookie = useCookie('token');
  const env = useRuntimeConfig();

  const token = authCookie?.value;
  return await $fetch(`${env.public.apiBaseUrl}cms/v2/files/upload`, {
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
