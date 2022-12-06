import ControlPanel from '../../src/controlPanel';
import createApi from './editor';

const cssClasses = {
  caption: 'inline-image__input',
};

/**
 * Config object without embed
 */
const config = {
  embed: {
    display: false,
  },

  unsplash: {
    appName: 'test',
  },
};

/**
 * Creates an instance of ControlPanel
 */
const createControlPanelWithOutEmbed = (onSelectImage, notify) => new ControlPanel({
  api: createApi(notify),
  config,
  cssClasses,
  onSelectImage,
});

export default createControlPanelWithOutEmbed;
