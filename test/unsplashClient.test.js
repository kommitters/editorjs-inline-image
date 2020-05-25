import nock from 'nock';
import createUnsplashClient from './fixtures/unsplashClient';
import {
  unsplashReponse, parsedResponse, unsplashEmptyResponse,
} from './fixtures/unsplashApi';

const mockApiRequest = (statusCode, response) => {
  nock('http://localhost')
    .get('/search/photos')
    .query({
      client_id: '12345',
      query: 'pizza',
      per_page: '30',
    })
    .reply(statusCode, response);
};

const mockCallback = (response, done) => (data) => {
  try {
    expect(data).toMatchObject(response);
    done();
  } catch (error) {
    done(error);
  }
};

describe('UnsplashClient', () => {
  let unsplashClient;

  afterEach(() => {
    nock.cleanAll();
  });

  describe('searchImages', () => {
    beforeEach(() => {
      unsplashClient = createUnsplashClient();
    });

    describe('successful API response', () => {
      it('calls callback passing a list of images from Unsplash', (done) => {
        mockApiRequest(200, unsplashReponse);

        const callback = mockCallback(parsedResponse, done);

        unsplashClient.searchImages('pizza', callback);
      });

      it('calls callback passing an empty array if search has no results', (done) => {
        mockApiRequest(200, unsplashEmptyResponse);

        const callback = mockCallback([], done);

        unsplashClient.searchImages('pizza', callback);
      });
    });

    describe('successful API response', () => {
      it('calls callback passing an empty array if API replies an error', (done) => {
        mockApiRequest(500, {});

        const callback = mockCallback([], done);

        unsplashClient.searchImages('pizza', callback);
      });
    });
  });
});
