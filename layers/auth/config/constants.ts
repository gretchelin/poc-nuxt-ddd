export const AUTH_COOKIE_NAME = 'token';
export const USER_COOKIE_NAME = 'user';

// storage keys
export const AUTH_STATE_CHANGE_NAME = 'loggedIn';
export const AUTH_STATE_USER_NAME = 'userinfo';
export const AUTH_STATE_STATUS = 'loggedIn';
export const AUTH_STATE_RBAC = 'accessControl';

export enum AuthStatus {
  AUTH = 'authenticated',
  UNAUTH = 'unauthenticated',
  PENDING = 'pending',
};
