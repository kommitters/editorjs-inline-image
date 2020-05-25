/**
 * Mock Editor.js API
 */
const createApi = (notify) => ({
  styles: {
    block: 'block',
    loader: 'loader',
    input: 'input',
  },
  blocks: {
    getCurrentBlockIndex() {
      return 0;
    },
    stretchBlock() {},
    delete() {},
  },
  notifier: {
    show: notify,
  },
});

export default createApi;
