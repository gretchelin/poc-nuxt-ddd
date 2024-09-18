export default function () {
  const cookie = useCookie('appConfig');
  return {
    primary_color: cookie.value?.primary_color,
    secondary_color: cookie.value?.secondary_color,
    text_color: cookie.value?.text_color,
  };
}
