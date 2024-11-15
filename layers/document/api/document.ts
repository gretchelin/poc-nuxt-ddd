

// TODO: will be set globally
export const getDocumentList = async (options = {}) => {
    const authCookie = useCookie('token');
    const env = useRuntimeConfig();

    const token = authCookie?.value;
    return await $fetch(`${env.public.apiBaseUrl}cms/v2/files/upload`, {
        headers: {
            'Authorization': token    
        }
    });
  };
  