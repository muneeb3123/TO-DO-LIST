// eslint-disable-next-line import/no-named-as-default
import ToDoList from '../../src/modules/render.js';

describe('ToDoList', () => {
  let todoItem;
  const Taskdescription = 'something';

  beforeEach(() => {
    // mocking localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => JSON.stringify([{ description: 'something', completed: false, index: 1 }])),
        setItem: jest.fn(() => null),
        clear: jest.fn(() => null),
      },
      writable: true,
    });

    document.body.innerHTML = `
      <form class="add-submit">
        <input placeholder="Add your task..." type="text">
        <input type="submit" class="submit" value="" title="click this or press enter to submit">
      </form>
      <ul id="to-do-list"></ul>
      <button class="clear-completed">Clear Completed</button>
    `;

    // create a new ToDoList instance
    todoItem = new ToDoList();
  });

  test('add description', () => {
    todoItem.addBook(Taskdescription);
    const listElement = document.getElementById('to-do-list').firstElementChild;

    expect(todoItem.collection).toContainEqual({
      description: Taskdescription,
      completed: false,
      index: expect.any(Number),
    });

    expect(todoItem.collection.length).toBeGreaterThan(0);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('taskCollection', JSON.stringify(todoItem.collection));
    expect(listElement.tagName).toBe('LI');
    expect(listElement.textContent.trim()).toBe(Taskdescription);
    expect(listElement.classList).not.toContain('completed');
  });

  test('remove item from list', () => {
    todoItem.removeBook(0);

    expect(todoItem.collection).toEqual([]);
    expect(todoItem.removeBook(0)).toBeFalsy();
    expect(window.localStorage.setItem).toHaveBeenCalledWith('taskCollection', JSON.stringify(todoItem.collection));

    // removed dom elements
    const listElement = document.getElementById('to-do-list').firstElementChild;
    expect(listElement).toBe(null);
  });
});
