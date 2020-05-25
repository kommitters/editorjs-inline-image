import ControlPanel from '../../src/controlPanel';
import { config } from './toolData';
import createApi from './editor';

const cssClasses = {
  caption: 'inline-image__input',
};

/**
 * Creates an instance of ControlPanel
 */
const createControlPanel = (onSelectImage, notify) => new ControlPanel({
  api: createApi(notify),
  config,
  cssClasses,
  onSelectImage,
});

export default createControlPanel;
