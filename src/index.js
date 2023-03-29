import './style.css';

const tasks = [
    {
      description: 'Task 1',
      completed: false,
      index: 1,
    },
    {
      description: 'Task 2',
      completed: true,
      index: 2,
    },
    {
      description: 'Task 3',
      completed: false,
      index: 3,
    },
  ];

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

  renderTasks();