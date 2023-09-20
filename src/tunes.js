import { make } from './helpers';

/**
 * Render editor Block Tunes
 */
export default class Tunes {
  /**
     * @param {{cssClasses: object, settings: object, onTuneToggled: Function, title: "string"}}
     *  cssClasses - CSS class names
     *  settings - Available image tunes
     *  onTuneToggled - Tune toggling callback
     *  title - Title string
     */
  constructor({
    cssClasses, settings, onTuneToggled, title,
  }) {
    this.cssClasses = cssClasses;
    this.onTuneToggled = onTuneToggled;
    this.settings = settings;
    this.title = title;
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
      withBorder: 'Chegara bilan',
      withBackground: 'Orqa fon bilan',
      stretched: "Rasimni cho'zish",
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

    if (!button) {
      return;
    }

    const newData = {
      ...this.data,
      [tuneName]: !this.data[tuneName],
    };

    button.classList.toggle(
      this.cssClasses.settingsButtonActive,
      newData[tuneName],
    );

    this.onTuneToggled(newData);
  }
}
