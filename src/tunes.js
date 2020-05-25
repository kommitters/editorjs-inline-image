import { make } from './helpers';

/**
 * Render editor Block Tunes
 */
export default class Tunes {
  /**
   * @param {{cssClasses: object, settings: object, onTuneToggled: Function}}
   *  cssClasses - Css class names
   *  settings - Available Image tunes
   *  onTuneToggled - Tune toggling callback
   */
  constructor({ cssClasses, settings, onTuneToggled }) {
    this.cssClasses = cssClasses;
    this.onTuneToggled = onTuneToggled;
    this.settings = settings;
    this.buttons = [];
  }

  /**
   * Makes buttons with tunes: add background, add border, stretch image
   *
   * @param {Object} data Tool data
   * @return {HTMLDivElement}
   */
  render(data) {
    const wrapper = make('div');
    this.buttons = [];

    this.settings.forEach((tune) => {
      const el = make('div', null, {
        innerHTML: tune.icon,
        onclick: () => this.tuneClicked(tune.name),
      });

      el.classList.add(this.cssClasses.settingsButton);
      el.dataset.tune = tune.name;
      el.classList.toggle(this.cssClasses.settingsButtonActive, data[tune.name]);

      this.buttons.push(el);
      wrapper.appendChild(el);
    });
    return wrapper;
  }

  /**
   * Clicks to one of the tunes
   *
   * @param {string} tuneName Clicked tune name
   * @returns {void}
   */
  tuneClicked(tuneName) {
    const button = this.buttons.find((el) => el.dataset.tune === tuneName);

    button.classList.toggle(this.cssClasses.settingsButtonActive,
      !button.classList.contains(this.cssClasses.settingsButtonActive));

    this.onTuneToggled(tuneName);
  }
}
