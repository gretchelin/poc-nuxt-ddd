import { http, HttpResponse, passthrough } from 'msw';
// import {CoreRequestHandler} from '../requestHandler';

export default [
  // Intercept "GET https://example.com/user" requests...
  http.get('https://pokeapi.co/api/v2/pokemon/:id', async () => {
    const mockNamespace = new URLSearchParams(window.location.search).get('mock');
    // only mock if there is a mock query param with value matches the pathname
    // ie. http://localhost:3000/playground/list?mock=playground
    // will mock this request when the request is made by any page that has `/playground` as its base pathname
    if (self?.location?.pathname?.indexOf(`/${mockNamespace}`) > -1) {
      const json = await import('../json/pokeapi.v2.pokemon.id.json');

      return HttpResponse.json(json);
    }

    // skip mocking and do the request as-is
    return passthrough();
  }),
];
