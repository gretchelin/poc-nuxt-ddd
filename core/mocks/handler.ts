// import mocks below
// ie. import report from './api/report';
import pokeapi from './api/pokeapi';
import config from './api/config';

export default [
  // extend the imported mocks here
  // ie. ...report,
  ...pokeapi,
  ...config,
];
