/**
 * @jest-environment jsdom
 */
import createUi from './fixtures/ui';
import { data } from './fixtures/toolData';
import triggerEvent from './testHelpers';
import ControlPanel from '../src/controlPanel';
import ModalHandler from '../src/modalHandler';

const notify = jest.fn();

describe('Ui', () => {
  let ui;

  beforeEach(() => {
    ui = createUi(jest.fn(), jest.fn(), notify);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('renders image if data is passed', () => {
      ui.render(data);

      const {
        wrapper, imageHolder, image, caption,
      } = ui.nodes;
      const credits = imageHolder.querySelector('.inline-image__image-credits');
      triggerEvent(image, 'load');

      expect(image.src).toBe(data.url);
      expect(caption.innerHTML).toBe(data.caption);
      expect(wrapper).toContainElement(image);
      expect(wrapper).toContainElement(caption);
      expect(credits).not.toBeEmptyDOMElement();
    });

    it('does not render image credits if unsplash data is not valid', () => {
      ui.render({ url: data.url });

      const { image, credits } = ui.nodes;
      triggerEvent(image, 'load');

      expect(credits).toBe(null);
    });

    it('renders control panel if no data is passed', () => {
      const mockRender = jest.spyOn(ControlPanel.prototype, 'render')
        .mockImplementation(() => document.createElement('div'));
      ui.render({});

      expect(mockRender).toHaveBeenCalled();
    });
  });

  it('shows error message on image load error', () => {
    ui.render({});

    const { image } = ui.nodes;
    triggerEvent(image, 'error');

    expect(notify).toBeCalled();
  });

  it('applies tune settings to image', () => {
    ui.render(data);

    ui.applyTune('withBackground', true);
    expect(ui.nodes.imageHolder).toHaveClass('inline-image__picture--withBackground');
  });

  describe('Instance classes', () => {
    beforeEach(() => { ui.render(data); });
    it('instances modalHandler', () => {
      expect(ui.modal).toBeDefined();
      expect(ui.modal).toBeInstanceOf(ModalHandler);
    });
  });

  describe('setEvents', () => {
    beforeEach(() => { ui.render(data); });
    it('adds click event to the Inline Image block', () => {
      expect(ui.nodes.image.onclick).toBeDefined();
    });
  });
});
