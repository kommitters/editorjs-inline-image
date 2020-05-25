import UnsplashClient from '../../src/unsplashClient';

const unsplashConfig = {
  apiUrl: 'http://localhost',
  appName: 'DemoApp',
  clientId: '12345',
  maxResults: '30',
};

/**
 * Creates an instance of UnsplashClient
 */
const createUnsplashClient = () => new UnsplashClient(unsplashConfig);

export default createUnsplashClient;
