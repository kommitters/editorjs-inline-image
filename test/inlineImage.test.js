import InlineImage from '../src/index';
import Ui from '../src/ui';
import createInlineImage from './fixtures/inlineImage';
import { data } from './fixtures/toolData';

jest.mock('../src/ui');

describe('InlineImage', () => {
  let inlineImage;
  let mockSetData;

  beforeEach(() => {
    jest.spyOn(InlineImage.prototype, 'data', 'get').mockImplementation(() => data);
    mockSetData = jest.spyOn(InlineImage.prototype, 'data', 'set').mockImplementation();
    inlineImage = createInlineImage(data);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validates data', () => {
    it('return true if data is valid', () => {
      expect(inlineImage.validate(data)).toBe(true);
    });

    it('return false if data is not valid', () => {
      expect(inlineImage.validate({ url: '' })).toBe(false);
    });
  });

  describe('onPaste', () => {
    it('handles tag event', () => {
      const event = {
        type: 'tag',
        detail: {
          data: {
            src: 'https://www.example.com/image.png',
          },
        },
      };

      inlineImage.onPaste(event);

      expect(mockSetData).toHaveBeenLastCalledWith({ url: event.detail.data.src });
    });

    it('handles pattern event', () => {
      const event = {
        type: 'pattern',
        detail: {
          data: 'https://www.example.com/image.png',
        },
      };

      inlineImage.onPaste(event);

      expect(mockSetData).toHaveBeenLastCalledWith({ url: event.detail.data });
    });

    it('handles file event', () => {
      const event = {
        type: 'file',
        detail: {
          file: 'https://www.example.com/image.png',
        },
      };

      const mockOnDropHandler = jest.spyOn(InlineImage.prototype, 'onDropHandler')
        .mockImplementation(() => Promise.resolve());
      inlineImage.onPaste(event);

      expect(mockOnDropHandler).toHaveBeenLastCalledWith(event.detail.file);
    });
  });

  it('tuneToggled', () => {
    const mockApplyTune = jest.spyOn(Ui.prototype, 'applyTune');

    inlineImage.tuneToggled('withBorder');

    expect(mockSetData).toHaveBeenLastCalledWith({ withBorder: true });
    expect(mockApplyTune).toHaveBeenCalledWith('withBorder', true);
  });
});
