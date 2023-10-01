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

    const tuneNames = {
      withBorder: 'With border',
      withBackground: 'With background',
      stretched: 'Stretch image',
    };

    this.settings.forEach((tune) => {
      const textEl = make('div', null, {
        innerText: tuneNames[tune.name],
      });

      textEl.classList.add('ce-popover-item__title');

      const el = make('div', [this.cssClasses.settingsButton], {
        onclick: () => this.tuneClicked(tune.name),
      });

      el.dataset.tune = tune.name;
      el.classList.toggle(
        this.cssClasses.settingsButtonActive,
        data[tune.name],
      );

      const svgWrapperEl = make('div', null, {
        innerHTML: tune.icon,
      });
      el.appendChild(svgWrapperEl);
      el.appendChild(textEl);

      svgWrapperEl.classList.add('ce-popover-item__icon');

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
