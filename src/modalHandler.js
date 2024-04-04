import { make, resizeToFit } from './helpers';

/**
 * Renders modal when the image is clicked and handle internal actions
 */
export default class ModalHandler {
  constructor() {
    this.modalHolder = document.getElementById('inline-image__modal');
    if (!this.modalHolder) {
      this.createModal();
      this.closeOutside();
    }
  }

  /**
   * Create and append modal into the UI
   */
  createModal() {
    const modal = make('div', 'modal', { id: 'inline-image__modal' });
    const content = make('div', 'modal-content', {
      id: 'inline-image__modal-content',
    });
    const closeButton = make('span', 'close', {
      id: 'inline-image__modal-close',
      innerHTML: '&times;',
      onclick: () => { this.close(); },
    });
    const image = make('img', 'modal-img', {
      id: 'inline-image__modal-img',
      alt: 'image',
    });

    modal.appendChild(content);

    content.appendChild(closeButton);
    content.appendChild(image);

    document.body.appendChild(modal);
  }

  /**
   * Open modal to display the image scaled up
   * @param {String} src - image url
   */
  open(src) {
    this.setImage(src);
    document.getElementById('inline-image__modal').style.display = 'flex';
  }

  /**
   * Load image in the modal and adjust size
   * @param {string} src - image url
   */
  setImage(src) {
    const image = document.getElementById('inline-image__modal-img');
    image.src = src;
    const container = document.getElementById('inline-image__modal-content');
    const screenW = screen.width - 200;
    const screenH = screen.height - 200;
    const { width, height } = resizeToFit(
      { width: image.width, height: image.height },
      { width: screenW, height: screenH },
    );
    container.style.maxHeight = `${height}px`;
    container.style.maxWidth = `${width}px`;
  }

  /**
   * Close modal
   */
  close() {
    document.getElementById('inline-image__modal').style.display = 'none';
  }

  /**
   * Close modal when clicking outside it
   */
  closeOutside() {
    document.addEventListener('click', (event) => {
      if (event.target.id === 'inline-image__modal') { this.close(); }
    });
  }
}
