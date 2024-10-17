export const getAppConfig = async () => {
  return useApi(`/organizations/configuration-init`);
};
