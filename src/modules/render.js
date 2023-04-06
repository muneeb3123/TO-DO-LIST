// import { clearAllButton } from './checkBtn.js';
import { form, input } from './link.js';
import { clearCompletedEvent } from './checkBtn.js';

class ToDoList {
  constructor() {
    this.collection = JSON.parse(localStorage.getItem('taskCollection')) || [];
    if (!Array.isArray(this.collection) || this.collection.length === 0) {
      this.collection = [];
    }
  }

  addBook = (Description) => {
    const newTask = {
      description: Description,
      completed: false,
      index: this.updateIndex(),
    };
    this.collection.push(newTask);
    this.updateLocalStorage();
  };

  removeBook = (index) => {
    this.collection = this.collection.filter(
      (task, index1) => index1 !== index,
    );
    this.updateIndex();
    this.updateLocalStorage();
    this.renderTasks();
  };

  editBook = (index, newDescription) => {
    this.collection[index].description = newDescription;
    this.updateLocalStorage();
    this.renderTasks();
  };

  renderTasks = () => {
    const toDoList = document.getElementById('to-do-list');
    toDoList.innerHTML = ''; // Clear the current list
    this.collection.forEach((task, index) => {
      const taskElement = `
        <li class='to-do-item'>
          <input class='check-button'  data-index='${index}' type='checkbox' ${
        task.completed ? 'checked' : ''
      }>
          <span class='task-description' data-index='${index}'>${
        task.description
      }</span>
          <span class='fas fa-ellipsis-v menu-icon' data-mine='${index}'></span>
          <span class='fas fa-trash remove-icon hidden' data-index='${index}'></span>
        </li>
      `;
      toDoList.innerHTML += taskElement;
    });

    const menuIcons = document.querySelectorAll('.menu-icon');

    menuIcons.forEach((menuIcon) => {
      menuIcon.addEventListener('click', () => {
        // Get the index, task description, and remove icon associated with the menu icon
        const index = parseInt(menuIcon.dataset.mine, 10);
        const taskDescription = document.querySelector(
          `[data-index='${index}'].task-description`,
        );
        const removeIcon = document.querySelector(
          `[data-index='${index}'].remove-icon`,
        );

        // Get the current task description and replace it with an empty input field
        const currentDescription = taskDescription.innerHTML;
        taskDescription.innerHTML = '';
        const inputField = document.createElement('input');
        inputField.classList.add('add-list');
        inputField.value = currentDescription;

        taskDescription.appendChild(inputField);
        inputField.focus();
        menuIcon.classList.add('hidden');
        removeIcon.classList.remove('hidden');

        inputField.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            const newDescription = inputField.value;
            taskDescription.innerHTML = newDescription;
            this.editBook(index, newDescription);
          }
        });
      });
    });

    const checkBtn = document.querySelectorAll('.check-button');
    checkBtn.forEach((event) => {
      event.addEventListener('change', () => {
        const index = parseInt(event.dataset.index, 10);
        const task = this.collection[index];
        task.completed = event.checked;
        localStorage.setItem('taskCollection', JSON.stringify(this.collection));
        this.renderTasks();
      });
    });
    const deleteIcons = document.querySelectorAll('.remove-icon');
    deleteIcons.forEach((deleteIcon) => {
      deleteIcon.addEventListener('click', () => {
        const index = parseInt(deleteIcon.dataset.index, 10);
        this.removeBook(index);
      });
    });
  };

  updateLocalStorage = () => {
    localStorage.setItem('taskCollection', JSON.stringify(this.collection));
  };

  bindEvents = () => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.addBook(input.value);
      input.value = '';
      this.renderTasks();
    });
    clearCompletedEvent.call(this);
  };

clearAll = () => {
  this.collection = this.collection.filter((task) => !task.completed);
  this.updateLocalStorage();
  this.updateIndex();
  this.renderTasks();
}

  updateIndex() {
    this.collection.forEach((element, index) => {
      element.index = index + 1;
    });
    return this.collection.length + 1;
  }

  init() {
    this.bindEvents();
    this.renderTasks();
  }
}

export default ToDoList;
