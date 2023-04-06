const clearAll = document.querySelector('.clear-completed');

// eslint-disable-next-line import/prefer-default-export
export const clearCompletedEvent = () => {
  clearAll.addEventListener('click', () => {
    this.clearAll();
  });
};
