import UnsplashClient from '../../src/unsplashClient';

const unsplashConfig = {
  apiUrl: 'http://localhost',
  appName: 'DemoApp',
  maxResults: 30,
  imageParams: {
    q: 90,
    w: 1500,
    fit: 'max',
  },
};

/**
 * Creates an instance of UnsplashClient
 */
const createUnsplashClient = () => new UnsplashClient(unsplashConfig);

export default createUnsplashClient;
