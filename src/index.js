import './styles.css';

const tasksArr = [
  {
    description: 'Write code',
    completed: false,
    index: 0,
  },
  {
    description: 'Watch football',
    completed: false,
    index: 1,
  },
  {
    description: 'Sleep',
    completed: true,
    index: 2,
  },
];

const toDoList = document.getElementById('to-do-list');

function populateTaskList(arr) {
  arr.forEach((task) => {
    const toDoItem = document.createElement('li');
    toDoItem.classList.add('to-do-item');
    toDoItem.innerHTML = `
    <button class="check-button">
      <span class="fas fa-check"></span>
    </button>
    <span class="task-description">${task.description}</span>
    <span class="fas fa-ellipsis-v"></span>
    `;
    toDoList.appendChild(toDoItem);
  });
}

populateTaskList(tasksArr);
