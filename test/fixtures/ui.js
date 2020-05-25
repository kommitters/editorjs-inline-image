import Ui from '../../src/ui';
import { config } from './toolData';
import createApi from './editor';

/**
 * Creates an instance of Ui
 */
const createUi = (onAddImageData, onTuneToggled, notify) => new Ui({
  api: createApi(notify),
  config,
  onAddImageData,
  onTuneToggled,
});

export default createUi;
