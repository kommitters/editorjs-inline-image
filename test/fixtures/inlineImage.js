import InlineImage from '../../src/index';
import { data, config } from './toolData';
import createApi from './editor';

/**
 * Creates an instance of InlineImage
 */
const createInlineImage = () => new InlineImage({
  data,
  api: createApi(() => null),
  config,
});

export default createInlineImage;
