/* eslint-disable import/prefer-default-export */
import { input, form } from './link.js';
import ToDoList from './render.js';

export const submit = form.addEventListener('submit', (event) => {
  event.preventDefault();
  const toDoList = new ToDoList();
  toDoList.addBook(input.value);
  input.value = '';
});
