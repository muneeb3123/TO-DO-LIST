const clearAll = document.querySelector('.clear-completed');

function clearCompletedEvent() {
  clearAll.addEventListener('click', function onClick() { /* eslint-disable-line prefer-arrow-callback */
    this.clearAll();
  }.bind(this));
}

export default clearCompletedEvent;