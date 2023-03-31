import { form, input } from './link.js';

export const menuIcons = document.querySelectorAll('.menu-icon');
export class ToDoList {
  constructor() {
    this.collection = JSON.parse(localStorage.getItem('bookCollection')) || [];
    if (!Array.isArray(this.collection) || this.collection.length === 0) {
      this.collection = [];
    }
    this.renderTasks();
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.addBook(input.value);
      input.value = '';
    });
  }

  addBook = (Description) => {
    const newTask = {
      description: Description,
      completed: false,
      index: this.updateIndex(),
    };
    this.collection.push(newTask);
    localStorage.setItem('bookCollection', JSON.stringify(this.collection));
    this.renderTasks();
  };

  removeBook = (index) => {
    this.collection[index].markedForDeletion = true;
    this.collection = this.collection.filter((task, i) => i !== index);
    localStorage.setItem('bookCollection', JSON.stringify(this.collection));
    this.renderTasks();
  };

  editBook = (index, newDescription) => {
    this.collection[index].description = newDescription;
    localStorage.setItem('bookCollection', JSON.stringify(this.collection));
    this.renderTasks();
  };

  renderTasks = () => {
    const toDoList = document.getElementById('to-do-list');
    toDoList.innerHTML = ''; // Clear the current list
    this.collection.forEach((task, index) => {
      const taskElement = `
        <li class='to-do-item'>
          <input class='check-button' type='checkbox'>
          <span class='task-description' data-index='${index}'>${task.description}</span>
          <span class='fas fa-ellipsis-v menu-icon' data-index='${index}'></span>
          <span class='fas fa-trash remove-icon hidden' data-index='${index}'></span>
        </li>
      `;
      toDoList.innerHTML += taskElement;
    });

    const menuIcons = document.querySelectorAll('.menu-icon');
    menuIcons.forEach((menuIcon) => {
      menuIcon.addEventListener('click', () => {
        const index = parseInt(menuIcon.dataset.index, 10);
        const taskDescription = document.querySelector(
          `[data-index='${index}'].task-description`,
        );
        const removeIcon = document.querySelector(
          `[data-index='${index}'].remove-icon`,
        );
        const currentDescription = taskDescription.innerHTML;
        taskDescription.innerHTML = '';
        const inputField = document.createElement('input');
        inputField.value = currentDescription;
        inputField.addEventListener('blur', () => {
          const newDescription = inputField.value;
          taskDescription.innerHTML = newDescription;
          this.editBook(index, newDescription);
        });
        taskDescription.appendChild(inputField);
        menuIcon.classList.add('hidden');
        removeIcon.classList.remove('hidden');
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

  updateIndex() {
    this.collection.forEach((element, index) => {
      element.index = index + 1;
    });
    return this.collection.length + 1;
  }
}
