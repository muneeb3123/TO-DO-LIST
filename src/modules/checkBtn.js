const clearAll = document.querySelector('.clear-completed');

export const clearCompletedEvent = function () {
    clearAll.addEventListener('click', function () {
      this.clearAll();
    }.bind(this));
  };
  
  