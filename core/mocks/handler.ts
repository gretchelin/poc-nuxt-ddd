// import mocks below
// ie. import report from './api/report';
import pokeapi from './api/pokeapi';
import config from './api/config';
import auth from './api/auth';

export default [
  // extend the imported mocks here
  // ie. ...report,
  ...pokeapi,
  ...config,
  ...auth,
];
