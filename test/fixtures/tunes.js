import Tunes from '../../src/tunes';

const cssClasses = {
  settingsButton: 'test',
  settingsButtonActive: 'active',
};

const settings = [
  {
    name: 'withBorder',
  },
  {
    name: 'stretched',
  },
  {
    name: 'withBackground',
  },
];

/**
 * Creates an instance of Tunes
 */
const createTunes = (onTuneToggled) => new Tunes({
  cssClasses,
  settings,
  onTuneToggled,
});

export default createTunes;
