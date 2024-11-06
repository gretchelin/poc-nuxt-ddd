import jwt from 'jsonwebtoken';
import * as Sentry from '@sentry/nuxt';
import { AUTH_COOKIE_NAME } from '#auth/config/constants';

export default defineEventHandler(async (event) => {
  // Parse the request body
  const formData = await readBody(event);

  let decoded;

  if (formData?.token) {
    decoded = jwt.decode(formData?.token);
  }
  else {
    // check for token in cookies
    const authCookie = getCookie(event, AUTH_COOKIE_NAME) || '';

    decoded = jwt.decode(authCookie);
  }

  // break out if jwt cannot be decoded
  if (!decoded) {
    return false;
  }

  // jwt can be decoded
  if (!!decoded?.exp || decoded?.exp === 0) {
    // check for expiry time
    const jwtExp = decoded?.exp * 1000; // x1000 because exp is in seconds while Data.getTime() is in ms.

    if ((new Date())?.getTime() >= jwtExp) {
      Sentry.captureMessage('Login Attempt: Expired credentials');
      throw createError({ statusCode: 401, statusMessage: 'Expired credentials' });
    }
  }

  console.log('[SERVER] verify.post', { decoded });

  return true;
});
