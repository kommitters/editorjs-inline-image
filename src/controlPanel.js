import { make, isUrl, createImageCredits } from './helpers';
import UnsplashClient from './unsplashClient';

/**
 * Renders control panel view
 *  - Embed image url
 *  - Embed image from Unsplash
 */
export default class ControlPanel {
  /**
   * @param {{ api: object, config: object, cssClasses: object,
   *  onSelectImage: Function, readOnly: Boolean }}
   *  api - Editorjs API
   *  config - Tool custom config
   *  readOnly - read-only mode flag
   *  cssClasses - Css class names
   *  onSelectImage - Image selection callback
   */
  constructor({
    api, config, cssClasses, onSelectImage, readOnly,
  }) {
    this.api = api;
    this.config = config;
    this.readOnly = readOnly;

    this.cssClasses = {
      ...cssClasses,
      controlPanel: 'inline-image__control-panel',
      tabWrapper: 'inline-image__tab-wrapper',
      tab: 'inline-image__tab',
      embedButton: 'inline-image__embed-button',
      search: 'inline-image__search',
      imageGallery: 'inline-image__image-gallery',
      noResults: 'inline-image__no-results',
      imgWrapper: 'inline-image__img-wrapper',
      thumb: 'inline-image__thumb',
      active: 'active',
      hidden: 'panel-hidden',
      scroll: 'panel-scroll',
    };

    this.onSelectImage = onSelectImage;

    this.nodes = {
      loader: null,
      embedUrlTab: null,
      unsplashTab: null,
      embedUrlPanel: null,
      unsplashPanel: null,
      imageGallery: null,
      searchInput: null,
    };

    this.unsplashClient = new UnsplashClient(this.config.unsplash);
    this.searchTimeout = null;
    this.showEmbedTab = this.config.embed ? this.config.embed.display : true;
  }

  /**
   * Creates Control Panel components
   *
   * @returns {HTMLDivElement}
   */
  render() {
    const wrapper = make('div', this.cssClasses.controlPanel);
    const tabWrapper = make('div', this.cssClasses.tabWrapper);
    const embedUrlTab = make('div', [this.cssClasses.tab, this.cssClasses.active], {
      innerHTML: 'Embed URL',
      onclick: () => this.showEmbedUrlPanel(),
    });
    const unsplashTab = make('div', [this.cssClasses.tab, this.showEmbedTab ? null : this.cssClasses.active], {
      innerHTML: 'Unsplash',
      onclick: () => this.showUnsplashPanel(),
    });

    const embedUrlPanel = this.renderEmbedUrlPanel();
    const unsplashPanel = this.renderUnsplashPanel();

    if (this.showEmbedTab) { tabWrapper.appendChild(embedUrlTab); }
    tabWrapper.appendChild(unsplashTab);
    wrapper.appendChild(tabWrapper);
    if (this.showEmbedTab) { wrapper.appendChild(embedUrlPanel); }
    wrapper.appendChild(unsplashPanel);

    this.nodes.embedUrlPanel = this.showEmbedTab ? embedUrlPanel : null;
    this.nodes.unsplashPanel = unsplashPanel;
    this.nodes.embedUrlTab = this.showEmbedTab ? embedUrlTab : null;
    this.nodes.unsplashTab = unsplashTab;

    return wrapper;
  }

  /**
   * Shows "Embed Url" control panel
   *
   * @returns {void}
   */
  showEmbedUrlPanel() {
    this.nodes.embedUrlTab.classList.add(this.cssClasses.active);
    this.nodes.unsplashTab.classList.remove(this.cssClasses.active);
    this.nodes.embedUrlPanel.classList.remove(this.cssClasses.hidden);
    this.nodes.unsplashPanel.classList.add(this.cssClasses.hidden);
  }

  /**
   * Shows "Unsplash" control panel
   *
   * @returns {void}
   */
  showUnsplashPanel() {
    this.nodes.unsplashTab.classList.add(this.cssClasses.active);
    this.nodes.embedUrlTab.classList.remove(this.cssClasses.active);
    this.nodes.unsplashPanel.classList.remove(this.cssClasses.hidden);
    this.nodes.embedUrlPanel.classList.add(this.cssClasses.hidden);
  }

  /**
   * Creates "Embed Url" control panel
   *
   * @returns {HTMLDivElement}
   */
  renderEmbedUrlPanel() {
    const wrapper = make('div');
    const urlInput = make('div', [this.cssClasses.input, this.cssClasses.caption], {
      id: 'image-url',
      contentEditable: !this.readOnly,
    });
    const embedImageButton = make('div', [this.cssClasses.embedButton, this.cssClasses.input], {
      id: 'embed-button',
      innerHTML: 'Embed Image',
      onclick: () => this.embedButtonClicked(urlInput.innerHTML),
    });

    urlInput.dataset.placeholder = 'Enter image url...';

    wrapper.appendChild(urlInput);
    wrapper.appendChild(embedImageButton);

    return wrapper;
  }

  /**
   * OnClick handler for Embed Image Button
   *
   * @param {string} imageUrl embedded image url
   * @returns {void}
   */
  embedButtonClicked(imageUrl) {
    if (isUrl(imageUrl)) {
      this.onSelectImage({ url: imageUrl });
    } else {
      this.api.notifier.show({
        message: 'Please enter a valid url.',
        style: 'error',
      });
    }
  }

  /**
   * Creates "Unsplash" control panel
   *
   * @returns {HTMLDivElement}
   */
  renderUnsplashPanel() {
    const wrapper = make('div', this.showEmbedTab ? this.cssClasses.hidden : null);
    const imageGallery = make('div', this.cssClasses.imageGallery);
    const searchInput = make('div', [this.cssClasses.input, this.cssClasses.caption, this.cssClasses.search], {
      id: 'unsplash-search',
      contentEditable: !this.readOnly,
      oninput: () => this.searchInputHandler(),
    });

    searchInput.dataset.placeholder = 'Search for an image...';

    wrapper.appendChild(searchInput);
    wrapper.appendChild(imageGallery);

    this.nodes.searchInput = searchInput;
    this.nodes.imageGallery = imageGallery;

    return wrapper;
  }

  /**
   * OnInput handler for Search input
   *
   * @returns {void}
   */
  searchInputHandler() {
    this.showLoader();
    this.performSearch();
  }

  /**
   * Shows a loader spinner on image gallery
   *
   * @returns {void}
   */
  showLoader() {
    this.nodes.imageGallery.innerHTML = '';
    this.nodes.loader = make('div', this.cssClasses.loading);
    this.nodes.imageGallery.appendChild(this.nodes.loader);
  }

  /**
   * Performs image search on user input.
   * Defines a timeout for preventing multiple requests
   *
   * @returns {void}
   */
  performSearch() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      const query = this.nodes.searchInput.innerHTML;
      this.unsplashClient.searchImages(
        query,
        (results) => this.appendImagesToGallery(results),
      );
    }, 1000);
  }

  /**
   * Creates the image gallery using Unsplash API results.
   *
   * @param {Array} results Images from Unsplash API
   */
  appendImagesToGallery(results) {
    this.nodes.imageGallery.innerHTML = '';
    if (results && results.length) {
      this.nodes.unsplashPanel.classList.add(this.cssClasses.scroll);
      results.forEach((image) => {
        this.createThumbImage(image);
      });
    } else {
      const noResults = make('div', this.cssClasses.noResults, {
        innerHTML: 'No images found',
      });
      this.nodes.imageGallery.appendChild(noResults);
      this.nodes.unsplashPanel.classList.remove(this.cssClasses.scroll);
    }
  }

  /**
   * Creates a thumb image and appends it to the image gallery
   *
   * @param {Object} image Unsplash image object
   * @returns {void}
   */
  createThumbImage(image) {
    const imgWrapper = make('div', this.cssClasses.imgWrapper);
    const img = make('img', this.cssClasses.thumb, {
      src: image.thumb,
      onclick: () => this.downloadUnsplashImage(image),
    });

    const { appName } = this.config.unsplash;
    const imageCredits = createImageCredits({ ...image, appName });

    imgWrapper.appendChild(img);
    imgWrapper.appendChild(imageCredits);
    this.nodes.imageGallery.append(imgWrapper);
  }

  /**
   * Handler for embedding Unsplash images.
   * Issues a request to Unsplash API
   *
   * @param {{url: string, author: string, profileLink: string, downloadLocation: string}}
   *  url - Image url
   *  author - Unsplash image author name
   *  profileLink - Unsplash author profile link
   *  downloadLocation - Unsplash endpoint for image download
   *
   * @returns {void}
   */
  downloadUnsplashImage({
    url, author, profileLink, downloadLocation,
  }) {
    this.onSelectImage({
      url,
      unsplash: {
        author,
        profileLink,
      },
    });
    this.unsplashClient.downloadImage(downloadLocation);
  }
}
