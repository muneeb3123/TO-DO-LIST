import tasks from './array.js';

const renderTasks = () => {
  const toDoList = document.getElementById('to-do-list');
  toDoList.innerHTML = '';
  tasks.sort((a, b) => a.index - b.index);
  toDoList.innerHTML = tasks
    .map(
      (task) => `
    <li class='to-do-item'>
      <button class='check-button'>
      </button>
      <span class='task-description'>${task.description}</span>
      <span class='fas fa-ellipsis-v'></span>
    </li>
  `,
    )
    .join('');
};

export default renderTasks;
