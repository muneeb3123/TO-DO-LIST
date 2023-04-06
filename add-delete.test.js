import ToDoList from './src/modules/render.js';

document.body.innerHTML = `
<form action='#' class='add-submit'>
<input placeholder='Add your task...' type='text' class='add-list'>
<input type='submit' class='submit' value='' title='click this or press enter to submit'>
</form>
</div>
</div>
<div id='to-do-list'></div>
<button class='clear-completed'>Clear all completed</button>
`;

describe('ToDo', () => {
  let todo;

  beforeEach(() => {
    todo = new ToDoList();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('adds a task', () => {
    todo.addBook('Task 1');
    expect(todo.collection.length).toBe(1);
  });

  test('removes a task', () => {
    todo.addBook('Task 1');
    todo.addBook('Task 2');
    todo.removeBook(0);
    expect(todo.collection.length).toBe(1);
  });

  test('edit a task', () => {
    todo.addBook('Task 1');
    todo.addBook('Task 1');
    const index = 1;
    const description = 'new list';
    todo.editBook(index, description);
    expect(todo.collection[1].description).toBe('new list');
  });

  test('update completeed status', () => {
    todo.addBook('Task 1');
    todo.addBook('Task 1');
    todo.collection[0].completed = true;
    expect(todo.collection[0].completed).toBe(true);
  });

});
