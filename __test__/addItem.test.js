import ToDoList from '../src/modules/render.js';

describe('toDoList', () => {
  let todoItem;

  beforeAll(() => {
    document.body.innerHTML = '<ul id="to-do-list"></ul>';
  });

  beforeEach(() => {
    todoItem = new ToDoList();
  });

  test('add description', () => {
    const Taskdescription = 'something';
    todoItem.addBook(Taskdescription);

    expect(todoItem.collection).toContainEqual({
      description: Taskdescription,
      completed: false,
      index: expect.any(Number),
    });
  });

  test(()=> {
    
  })
});
