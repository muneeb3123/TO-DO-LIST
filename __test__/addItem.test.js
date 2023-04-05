import ToDoList from '../src/modules/render.js';

describe('toDoList', () => {
  let todoItem;
  const Taskdescription = 'something';

  beforeAll(() => {
    document.body.innerHTML = '<ul id="to-do-list"></ul>';
  });

  beforeEach(() => {
    todoItem = new ToDoList();
  });

  test('add description', () => {
    todoItem.addBook(Taskdescription);

    expect(todoItem.collection).toContainEqual({
      description: Taskdescription,
      completed: false,
      index: expect.any(Number),
    });
  });

  test('remove item from list, when clicking the trash icon', () => {
    todoItem.addBook(Taskdescription);
    const bookIndex = todoItem.collection[0].index;
    todoItem.removeBook(bookIndex);
    expect(todoItem.collection[bookIndex]).toBeFalsy();
  });
});
