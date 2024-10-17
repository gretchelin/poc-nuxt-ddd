import jwt from 'jsonwebtoken';
import * as Sentry from '@sentry/nuxt';
import { USERS } from '../sample';

export const SECRET = 'testKey';
const EXPIRY_TIME = '8h';

export default defineEventHandler(async (event) => {
  // Parse the request body
  const formData = await readBody(event);

  const user = Object.keys(USERS).includes(formData?.email);
  if (user) {
    const accessToken = jwt.sign({ user: USERS[formData?.email], scope: ['user'] }, SECRET, { expiresIn: EXPIRY_TIME });
    return {
      data: {
        token: accessToken,
      },
    };
  }

  Sentry.captureMessage('Login Attempt: Incorrect credentials');
  throw createError({ statusCode: 403, statusMessage: 'Incorrect credentials' });
});
