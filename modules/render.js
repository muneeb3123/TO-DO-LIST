import tasks from './array.js';

const renderTasks = () => {
  const toDoList = document.getElementById('to-do-list');
  toDoList.innerHTML = '';
  tasks.sort((a, b) => a.index - b.index);
  const taskItems = tasks.map((task) => {
    const taskItem = document.createElement('li');
    taskItem.innerText = task.description;
    if (task.completed) {
      taskItem.classList.add('completed');
    }
    return taskItem;
  });
  toDoList.append(...taskItems);
};

export default renderTasks;
