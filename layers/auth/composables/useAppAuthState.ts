export default function () {
  const { session: data, status } = storeToRefs(useAppAuthStore());

  return {
    data, status,
  };
}
