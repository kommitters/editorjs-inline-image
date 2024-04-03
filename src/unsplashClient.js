import axios from 'axios';

/**
 * Client for Unsplash API
 */
export default class UnsplashClient {
  constructor(config) {
    // Remove trailing slashes from the URL
    this.apiUrl = config && config.apiUrl.replace(/\/+$/, '');
    this.perPage = config && config.maxResults ? config.maxResults : 30;
  }

  /**
   * Search images
   *
   * @param {string} query Image search query term
   * @param {string} orientation Image search orientation term
   * @param {Function} callback Function for rendering image gallery
   * @returns {void}
   */
  searchImages(query, orientation, callback) {
    const params = {
      query,
      per_page: this.perPage,
    };

    if (orientation) params.orientation = orientation;
    axios.get(`${this.apiUrl}/search/photos`, {
      params,
    })
      .then((response) => callback(this.parseResponse(response.data)))
      .catch(() => callback([]));
  }

  /**
   * Parses Unsplash API response
   * @param {{results: string}} results Array of images from Unsplash
   */
  parseResponse({ results }) {
    return results.map((image) => this.buildImageObject(image));
  }

  /**
   * Builds an image object
   *
   * @param {object} image Unsplash image object
   * @returns {object} Image object
   */
  buildImageObject(image) {
    return {
      url: image.urls.full,
      thumb: image.urls.thumb,
      downloadLocation: image.links.download_location,
      author: image.user.name,
      profileLink: image.user.links.html,
    };
  }

  /**
  * Download image from Unsplash
  * Required by Unsplash API Guideline for tracking purposes
  * https://help.unsplash.com/en/articles/2511258-guideline-triggering-a-download
  *
  * @param {string} downloadLocation Image download endpoint
  * @returns {void}
  */
  downloadImage(downloadLocation) {
    // Replace Unsplash API URL with the proxy API URL
    const proxyDownloadLocation = downloadLocation.replace('https://api.unsplash.com', this.apiUrl);
    // eslint-disable-next-line no-console
    axios.get(proxyDownloadLocation).catch((error) => console.error('Error downloading image', error));
  }
}
