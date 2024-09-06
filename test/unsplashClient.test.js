import nock from 'nock';
import createUnsplashClient from './fixtures/unsplashClient';
import {
  unsplashReponse, parsedResponse, unsplashEmptyResponse,
} from './fixtures/unsplashApi';

const mockApiRequest = (statusCode, response) => {
  nock('http://localhost')
    .get('/search/photos')
    .query({
      query: 'pizza',
      per_page: 30,
      orientation: 'landscape',
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

        unsplashClient.searchImages('pizza', 'landscape', callback);
      });

      it('calls callback passing an empty array if search has no results', (done) => {
        mockApiRequest(200, unsplashEmptyResponse);

        const callback = mockCallback([], done);

        unsplashClient.searchImages('pizza', 'landscape', callback);
      });
    });

    describe('successful API response', () => {
      it('calls callback passing an empty array if API replies an error', (done) => {
        mockApiRequest(500, {});

        const callback = mockCallback([], done);

        unsplashClient.searchImages('pizza', 'landscape', callback);
      });
    });
  });
  describe('modification of parameters of the selected image', () => {
    beforeEach(() => {
      unsplashClient = createUnsplashClient();
    });
    it('add new parameters to URL without existing parameters', () => {
      const inputUrl = 'https://example.com/image.jpg?ixid=M3w2NTA0MjJ8MHwxfHNlYXJjaHwxfHxjYXR8ZW58MHx8fHwxNzI1NTQzOTQ2fDA&ixlib=rb-4.0.3';
      const result = unsplashClient.dynamicImageResizing(inputUrl);
      expect(result).toBe(`${inputUrl}&q=90&w=1500&fit=max`);
    });

    it('modify existing parameters in URL', () => {
      const inputUrl = 'https://example.com/image.jpg?ixid=M3w2NTA0MjJ8MHwxfHNlYXJjaHwxfHxjYXR8ZW58MHx8fHwxNzI1NTQzOTQ2fDA&ixlib=rb-4.0.3&q=60&w=100&fit=min';
      const result = unsplashClient.dynamicImageResizing(inputUrl);
      expect(result).toBe('https://example.com/image.jpg?ixid=M3w2NTA0MjJ8MHwxfHNlYXJjaHwxfHxjYXR8ZW58MHx8fHwxNzI1NTQzOTQ2fDA&ixlib=rb-4.0.3&q=90&w=1500&fit=max');
    });

    it('modify the existing and new parameters in the URL', () => {
      const inputUrl = 'https://example.com/image.jpg?ixid=M3w2NTA0MjJ8MHwxfHNlYXJjaHwxfHxjYXR8ZW58MHx8fHwxNzI1NTQzOTQ2fDA&ixlib=rb-4.0.3&w=100';
      const result = unsplashClient.dynamicImageResizing(inputUrl);
      expect(result).toBe('https://example.com/image.jpg?ixid=M3w2NTA0MjJ8MHwxfHNlYXJjaHwxfHxjYXR8ZW58MHx8fHwxNzI1NTQzOTQ2fDA&ixlib=rb-4.0.3&w=1500&q=90&fit=max');
    });
  });
});
