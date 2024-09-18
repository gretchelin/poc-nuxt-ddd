import jwt from 'jsonwebtoken';
import { SECRET } from './login.post';

export default defineEventHandler((event) => {
  const authHeaderValue = getRequestHeader(event, 'authorization');
  if (typeof authHeaderValue === 'undefined') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Need to pass valid Bearer-authorization header to access this endpoint',
    });
  }

  const extractedToken = authHeaderValue.split(`Bearer `)[1];
  try {
    return jwt.verify(extractedToken, SECRET);
  }
  catch (err) {
    throw createError({ statusCode: 403, statusMessage: 'You must be logged in to use this endpoint', stack: (err as Record<string, any>)?.stack });
  }
});
