import './index.css';
import Ui from './ui';
import toolboxIcon from '../assets/toolboxIcon.svg';

/**
 * InlineImage Tool for the Editor.js
 * Works with pasted images, embedded URLs and Unsplash images.
 * Requires no server-side uploader.
 *
 * @typedef {object} InlineImageData
 * @description Tool's input and output data format
 * @property {string} url — image URL
 * @property {string} caption — image caption
 * @property {boolean} withBorder - should image be rendered with border
 * @property {boolean} withBackground - should image be rendered with background
 * @property {boolean} stretched - should image be stretched to full width of container
 * @property {boolean} middle - should image be stretched to middle width of container
 * @property {object} unsplash - Unsplash image information
 *  - author: Unsplash image author name
 *  - profileLink: Author profile link
 */
export default class InlineImage {
  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @returns {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      title: 'Image',
      icon: toolboxIcon,
    };
  }

  /**
   * Render tool`s main Element and fill it with saved data
   *
   * @param {{data: object, config: object, api: object, readOnly: Boolean}}
   *   data — previously saved data
   *   config - custom tool config
   *   api - Editor.js API
   *   readOnly - read-only mode flag
   */
  constructor({
    data, api, config, readOnly,
  }) {
    this.api = api;
    this.readOnly = readOnly;

    this.ui = new Ui({
      data,
      api,
      config,
      readOnly,
      onAddImageData: (imageData) => this.addImageData(imageData),
      onTuneToggled: (tuneName) => this.tuneToggled(tuneName),
    });

    this.data = {
      url: data.url || '',
      caption: data.caption || '',
      withBorder: data.withBorder !== undefined ? data.withBorder : false,
      withBackground: data.withBackground !== undefined ? data.withBackground : false,
      stretched: data.stretched !== undefined ? data.stretched : false,
      middle: data.middle !== undefined ? data.middle : false,
      unsplash: data.unsplash,
    };
  }

  /**
   * Renders Block content
   *
   * @returns {HTMLDivElement}
   */
  render() {
    return this.ui.render(this.data);
  }

  /**
   * Returns Block data
   *
   * @returns {InlineImageData}
   */
  save() {
    const { caption } = this.ui.nodes;

    this.data.caption = caption.innerHTML;

    return this.data;
  }

  /**
   * Validate saved data returned by the save method
   *
   * @param {object} savedData Block saved data
   */
  validate(savedData) {
    if (!savedData.url.trim()) {
      return false;
    }
    return true;
  }

  /**
   * Sanitizer rules
   *
   * @see {@link https://editorjs.io/sanitizer}
   */
  static get sanitize() {
    return {
      url: {},
      withBorder: {},
      withBackground: {},
      stretched: {},
      middle: {},
      caption: {
        br: true,
      },
    };
  }

  /**
   * Read pasted image and convert it to base64
   *
   * @param {File} file Image file
   * @returns {Promise<InlineImageData>}
   */
  onDropHandler(file) {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = (event) => {
        resolve({
          url: event.target.result,
          caption: file.name,
        });
      };
    });
  }

  /**
   * On paste callback that is fired from Editor.
   *
   * @param {PasteEvent} event - event with pasted config
   */
  onPaste(event) {
    this.ui.showLoader();
    switch (event.type) {
      case 'tag':
        this.data = {
          url: event.detail.data.src,
        };
        break;
      case 'pattern':
        this.data = {
          url: event.detail.data,
        };
        break;
      case 'file':
        this.onDropHandler(event.detail.file)
          .then((data) => {
            this.data = data;
          });
        break;
      default:
        break;
    }
  }

  /**
   * Callback for updating data when the image is embedded
   *
   * @param {object} imageData Image data
   */
  addImageData(imageData) {
    this.data = imageData;
  }

  /**
   * Returns image data
   *
   * @return {InlineImageData}
   */
  get data() {
    return this._data;
  }

  /**
   * Set image data and update the view
   *
   * @param {InlineImageData} data Image data
   */
  set data(data) {
    this._data = { ...this.data, ...data };

    if (this.ui.nodes.image) {
      this.ui.nodes.image.src = this.data.url;
    }

    if (this.ui.nodes.caption) {
      this.ui.nodes.caption.innerHTML = this.data.caption;
    }
  }

  /**
   * Specify paste substitutes
   *
   * @see {@link https://editorjs.io/paste-substitutions}
   */
  static get pasteConfig() {
    return {
      patterns: {
        image: /https?:\/\/\S+\.(gif|jpe?g|tiff|png)$/i,
      },
      tags: ['img'],
      files: {
        mimeTypes: ['image/*'],
      },
    };
  }

  /**
   * Makes buttons with tunes: add background, add border, stretch image
   *
   * @return {HTMLDivElement}
   */
  renderSettings() {
    return this.ui.renderSettings(this.data);
  }

  /**
   * Callback fired when Block Tune is activated
   *
   * @param {string} tuneName - tune that has been clicked
   * @returns {void}
   */
  tuneToggled(tuneName) {
    const value = !this.data[tuneName];
    this.data = { [tuneName]: value };
    this.ui.applyTune(tuneName, value);
  }

  /**
   * Notify core that read-only mode is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return true;
  }
}
