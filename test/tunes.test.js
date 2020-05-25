import createTunes from './fixtures/tunes';
import { data } from './fixtures/toolData';

const callback = jest.fn();

describe('Tunes', () => {
  let tunes;

  beforeEach(() => {
    tunes = createTunes(callback);
    tunes.render(data);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('creates tunes buttons', () => {
    expect(tunes.buttons.length).toBe(3);
  });

  it('triggers onTuneToggled callback when button clicked', () => {
    const button = tunes.buttons[0];

    button.click();

    expect(callback).toBeCalled();
  });

  it('changes button state when clicked', () => {
    const button = tunes.buttons[0];
    button.click();

    expect(button).toHaveClass('active');
  });
});
