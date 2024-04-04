/**
 * Helper for making Elements with attributes
 *
 * @param  {string} tagName New Element tag name
 * @param  {Array|string} classNames List or name of CSS class
 * @param  {object} attributes Any attributes
 * @returns {Element}
 */
export const make = (tagName, classNames = null, attributes = {}) => {
  const el = document.createElement(tagName);

  if (Array.isArray(classNames)) {
    el.classList.add(...classNames);
  } else if (classNames) {
    el.classList.add(classNames);
  }

  Object.keys(attributes).forEach((attrName) => {
    el[attrName] = attributes[attrName];
  });

  return el;
};

/**
 * Validates Url
 *
 * @param {string} url Url to validate
 * @returns {boolean} Valid Url
 */
export const isUrl = (url) => {
  const regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
  return regex.test(url);
};

/**
 * Creates an element with the Unsplash image author information
 *
 * @param {{appName: string, authorName: string, authorProfileLink: string}}
 *  appName - Application name registered on Unsplash
 *  authorName - Image author name
 *  authorProfileLink - Unsplash author profile link object
 *
 * @returns {HTMLDivElement}
 */
export const createImageCredits = ({ appName, author, profileLink }) => {
  const wrapper = make('div', 'inline-image__image-credits');
  const by = make('div', null, {
    innerHTML: 'by ',
    style: 'display: inline;',
  });
  const authorProfileLink = make('a', '', {
    href: `${profileLink}?utm_source=${appName}&utm_medium=referral`,
    innerHTML: author,
    target: '_blank',
  });
  const on = make('div', null, {
    innerHTML: ' on ',
    style: 'display: inline;',
  });
  const unsplashLink = make('a', '', {
    href: `https://unsplash.com/?utm_source=${appName}&utm_medium=referral`,
    innerHTML: 'Unsplash',
    target: '_blank',
  });

  wrapper.appendChild(by);
  wrapper.appendChild(authorProfileLink);
  wrapper.appendChild(on);
  wrapper.appendChild(unsplashLink);
  return wrapper;
};

/**
 * Resize an image to fit within the modal.
 *
 * @param {{width: number, height: number}} ImageSize image width and height.
 * @param {{width: number, height: number}} sizeToFit width and height size to fit the image.
 *
 * @returns {{width: number, height: number}}
 */
export const resizeToFit = (
  { width: imgWidth, height: imgHeight },
  { width: widthToFit, height: heightToFit },
) => {
  const imgRatio = imgWidth / imgHeight;
  const ratioToFit = widthToFit / heightToFit;

  if (imgRatio > ratioToFit) return { width: widthToFit, height: widthToFit / imgRatio };
  return { width: heightToFit * imgRatio, height: heightToFit };
};
