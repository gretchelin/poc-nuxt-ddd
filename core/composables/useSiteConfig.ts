export default function () {
  const COOKIE_KEY = 'orgConfigs';
  const cookie = useCookie(COOKIE_KEY);

  const logoImg = computed(() => cookie.value?.url_logo);
  const orgCode = computed(() => cookie.value?.org_code);
  const faviconImg = computed(() => cookie.value?.url_favicon);
  const appTitle = computed(() => cookie.value?.website_title);
  const colorPrimary = computed(() => cookie.value?.primary_color);
  const colorSecondary = computed(() => cookie.value?.secondary_color);
  const colorText = computed(() => cookie.value?.text_color);
  const subdomainUrl = computed(() => cookie.value?.url_subdomain);
  const domainUrl = computed(() => cookie.value?.url_domain);
  const frontpageUrl = computed(() => cookie.value?.url_main_frontpage);
  const cmsUrl = computed(() => cookie.value?.url_main_cms);

  return {
    COOKIE_KEY,
    colorPrimary,
    colorSecondary,
    colorText,
    logoImg,
    faviconImg,
    orgCode,
    appTitle,
    subdomainUrl,
    domainUrl,
    frontpageUrl,
    cmsUrl,
  };
}
