export type PostLoginResponseType = {
  success?: boolean;
  message?: string;
  status_code?: number;
  data?: {
    user?: {
      id?: number;
      user_uuid?: string;
      partner_id?: null;
      user_group_id?: null;
      socket_id?: null;
      username?: string;
      email?: string;
      full_name?: string;
      nik?: string;
      scope?: null;
      auth?: string;
      phone?: string;
      company_code?: null;
      divisi_code?: null;
      user_agent?: null;
      picture?: string;
      user_interest?: null;
      company_name?: string;
      divisi_name?: string;
      posisi?: string;
      job_function?: string;
      extraproperties?: null;
      first_access?: Date;
      last_login?: Date;
      current_login?: Date;
      is_telkom_group?: boolean;
      business_domain_id?: null;
      about?: string;
      bumn_id?: null;
      program_id?: null;
      email_public?: null;
      last_nps_apperead?: null;
      suspend_count?: null;
      suspend_at?: null;
      banner?: string;
      country?: null;
      city?: string;
      address?: string;
      industrial_cluster_id?: null;
      google_id?: null;
      google_data?: null;
      sso_id?: null;
      sso_data?: null;
      linkedin_id?: null;
      linkedin_data?: null;
      band?: null;
      posisi_code?: null;
      job_function_code?: null;
      gender?: string;
      device_id?: null;
      uuid?: null;
      expertlevel_id?: null;
      quote_expert?: null;
      flag?: null;
      is_coach?: boolean;
      nik_atasan?: null;
      picture_compress?: string;
      refresh_token?: null;
      usertag?: string;
      birthday?: null;
      course?: null;
      point?: null;
      waktu?: null;
      title_flow?: null;
      start_at?: null;
      finished_at?: null;
      points?: null;
      title_course?: null;
      cek_duplikat?: null;
      is_expert?: null;
      supervisor_id?: null;
      apple_id?: null;
      external_user_id?: null;
      programs?: {
        id?: number;
        title?: string;
        slug?: string;
        org_code?: string;
        orghomepage_id?: number;
        jouneyhomepage_id?: null;
      }[];
      roles?: {
        id?: number;
        title?: string;
        slug?: string;
        scope?: string;
      }[];
      interests?: {
        id?: number;
        title?: string;
      }[];
    };
    token?: string;
    token_sso?: string;
    access_control?: { [key: string]: boolean }[];
    expiredAt?: number;
  };
};

export const postLogin = (data: { email: string; password: string; org_code: string }, options: FetchOptions = {}) => {
  return useNuxtApp().$api<PostLoginResponseType>('/v3/cms/auth/login', {
    ...(options || {}),
    method: 'post',
    body: data,
  });
};
