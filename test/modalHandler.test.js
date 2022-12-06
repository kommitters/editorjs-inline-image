import createModalHandler from './fixtures/modalHandler';

describe('ModalHandler', () => {
  let modalHandler;
  let modal;
  let container;
  let image;
  let closeButton;
  let src;

  beforeEach(() => {
    modalHandler = createModalHandler();
    modal = document.getElementById('inline-image__modal');
    container = document.getElementById('inline-image__modal-content');
    image = document.getElementById('inline-image__modal-img');
    closeButton = document.getElementById('inline-image__modal-close');
    src = 'https://encrypted-tbn0.gstatic.com/images?';
  });

  describe('createModal', () => {
    it('creates modal with HTML Elements', () => {
      expect(modal).toBeDefined();
      expect(container).toBeDefined();
      expect(image).toBeDefined();
      expect(closeButton).toBeDefined();
    });

    it('adds click event to the document', () => {
      expect(document.onclick).toBeDefined();
    });

    it('adds click event to close button', () => {
      expect(closeButton.onclick).toBeDefined();
    });
  });

  describe('open', () => {
    it('opens the modal with the image scaled up', () => {
      modalHandler.open(src);
      expect(modal.style.display).toBe('flex');
    });
  });

  describe('setImage', () => {
    it('sets the image and adjust container size', () => {
      modalHandler.setImage(src);
      expect(image.src).toBe(src);
      expect(container.style).toHaveProperty('maxHeight');
      expect(container.style).toHaveProperty('maxWidth');
    });
  });

  describe('close', () => {
    it('closes the modal', () => {
      modal.style.display = 'flex';
      modalHandler.close();
      expect(modal.style.display).toBe('none');
    });
  });

  describe('closeOutside', () => {
    beforeEach(() => {
      modal.style.display = 'flex';
    });

    it('closes the modal when clicking outside the image container', () => {
      modal.click();
      expect(modal.style.display).toBe('none');
    });

    it('Does not close the modal if the user clicks inside the container image', () => {
      container.click();
      expect(modal.style.display).not.toBe('none');
    });
  });

  describe('close modal with close button', () => {
    it('closes the modal', () => {
      modal.style.display = 'flex';
      closeButton.click();
      expect(modal.style.display).toBe('none');
    });
  });
});
