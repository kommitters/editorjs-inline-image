import { make, createImageCredits } from './helpers';
import Tunes from './tunes';
import ControlPanel from './controlPanel';
import bgIcon from '../assets/backgroundIcon.svg';
import borderIcon from '../assets/borderIcon.svg';
import stretchedIcon from '../assets/toolboxIcon.svg';
import ModalHandler from './modalHandler';

/**
 * Class for working with UI:
 *  - rendering base structure
 *  - show/hide preview
 *  - apply tune view
 */
export default class Ui {
  /**
   * @param {{api: object, config: object, readOnly: Boolean,
   *   onAddImageData: Function, onTuneToggled: Function}}
   *   api - Editorjs API
   *   config - Tool custom config
   *   readOnly - read-only mode flag
   *   onAddImageData - Callback for adding image data
   *   onTuneToggled - Callback for updating tunes data
   */
  constructor({
    api, config, readOnly, onAddImageData, onTuneToggled,
  }) {
    this.api = api;
    this.config = config;
    this.readOnly = readOnly;
    this.onAddImageData = onAddImageData;
    this.onTuneToggled = onTuneToggled;

    this.CSS = {
      baseClass: this.api.styles.block,
      loading: this.api.styles.loader,
      input: this.api.styles.input,
      wrapper: 'inline-image',
      imageHolder: 'inline-image__picture',
      caption: 'inline-image__caption',
    };

    this.settings = [
      {
        name: 'withBorder',
        icon: borderIcon,
      },
      {
        name: 'stretched',
        icon: stretchedIcon,
      },
      {
        name: 'withBackground',
        icon: bgIcon,
      },
    ];

    this.controlPanel = new ControlPanel({
      api,
      config,
      readOnly,
      cssClasses: this.CSS,
      onSelectImage: (imageData) => this.selectImage(imageData),
    });

    this.tunes = new Tunes({
      cssClasses: {
        settingsButton: this.api.styles.settingsButton,
        settingsButtonActive: this.api.styles.settingsButtonActive,
      },
      settings: this.settings,
      onTuneToggled,
    });

    this.nodes = {
      wrapper: null,
      loader: null,
      imageHolder: null,
      image: null,
      caption: null,
      credits: null,
    };

    this.modal = new ModalHandler();
  }

  /**
   * Renders tool UI
   *
   * @param {Object} data Saved tool data
   * @returns {HTMLDivElement}
   */
  render(data) {
    const wrapper = make('div', [this.CSS.baseClass, this.CSS.wrapper]);
    const loader = make('div', this.CSS.loading);
    const image = make('img', '', {
      onload: () => this.onImageLoad(),
      onerror: () => this.onImageLoadError(),
    });
    const caption = make('div', [this.CSS.input, this.CSS.caption], {
      contentEditable: !this.readOnly,
      innerHTML: data.caption || '',
    });
    this.nodes.imageHolder = make('div', this.CSS.imageHolder);

    caption.dataset.placeholder = 'Enter a caption';

    if (data.url) {
      wrapper.appendChild(loader);
      image.src = data.url;
      this.buildImageCredits(data);
    } else {
      const controlPanelWrapper = this.controlPanel.render();
      this.nodes.controlPanelWrapper = controlPanelWrapper;
      wrapper.appendChild(controlPanelWrapper);
    }

    this.nodes.wrapper = wrapper;
    this.nodes.loader = loader;
    this.nodes.image = image;
    this.nodes.caption = caption;

    this.applySettings(data);

    this.setEvents();

    return wrapper;
  }

  /**
   * Builds Unsplash image credits element
   *
   * @param {Object} imageData Tool data
   * @returns {HTMLDivElement}
   */
  buildImageCredits(imageData) {
    const unsplashData = imageData.unsplash;
    if (unsplashData && unsplashData.author && unsplashData.profileLink) {
      const { appName } = this.config.unsplash;
      const credits = createImageCredits({ ...unsplashData, appName });
      this.nodes.imageHolder.appendChild(credits);
      this.nodes.credits = credits;
    }
  }

  /**
   * On image load callback
   * Shows the embedded image
   *
   * @returns {void}
   */
  onImageLoad() {
    this.nodes.imageHolder.prepend(this.nodes.image);
    this.nodes.wrapper.appendChild(this.nodes.imageHolder);
    this.nodes.wrapper.appendChild(this.nodes.caption);
    this.nodes.loader.remove();
  }

  /**
   * Callback fired when image fails on load.
   * It removes current editor block and notifies error
   *
   * @returns {void}
   */
  onImageLoadError() {
    this.removeCurrentBlock();
    this.api.notifier.show({
      message: 'Can not load the image, try again!',
      style: 'error',
    });
  }

  /**
   * Removes current block from editor
   *
   * @returns {void}
   */
  removeCurrentBlock() {
    Promise.resolve().then(() => {
      const blockIndex = this.api.blocks.getCurrentBlockIndex();

      this.api.blocks.delete(blockIndex);
    })
      .catch((err) => {
        console.error(err);
      });
  }

  /**
   * Makes buttons with tunes
   *
   * @returns {HTMLDivElement}
   */
  renderSettings(data) {
    return this.tunes.render(data);
  }

  /**
   * Shows a loader spinner
   *
   * @returns {void}
   */
  showLoader() {
    this.nodes.controlPanelWrapper.remove();
    this.nodes.wrapper.appendChild(this.nodes.loader);
  }

  /**
   * Callback fired when an image is embedded
   *
   * @param {Object} data Tool data
   * @returns {void}
   */
  selectImage(data) {
    this.onAddImageData(data);
    this.showLoader();
    this.buildImageCredits(data);
  }

  /**
   * Apply visual representation of activated tune
   *
   * @param {string} tuneName One of available tunes
   * @param {boolean} status True for enable, false for disable
   * @returns {void}
   */
  applyTune(tuneName, status) {
    this.nodes.imageHolder.classList.toggle(`${this.CSS.imageHolder}--${tuneName}`, status);

    if (tuneName === 'stretched') {
      Promise.resolve().then(() => {
        const blockIndex = this.api.blocks.getCurrentBlockIndex();
        this.api.blocks.stretchBlock(blockIndex, status);
      })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  /**
   * Apply tunes to image from data
   *
   * @param {Object} data Tool data
   * @returns {void}
   */
  applySettings(data) {
    this.settings.forEach((tune) => {
      this.applyTune(tune.name, data[tune.name]);
    });
  }

  /**
   * Capture events in the Inline Image block
   */
  setEvents() {
    this.nodes.image.addEventListener('click', () => {
      this.modal.open(this.nodes.image.src);
    });
  }
}
