// eslint-disable-next-line import/no-named-as-default
import ToDoList from '../../src/modules/render.js';

describe('ToDoList', () => {
  let todoItem;
  const Taskdescription = 'something';

  beforeAll(() => {
    document.body.innerHTML = `
    <form class="add-submit">
    <input placeholder="Add your task..." type="text">
    <input type="submit" class="submit" value="" title="click this or press enter to submit">
</form>
    <ul id="to-do-list"></ul>
    <button class="clear-completed">Clear Completed</button>
  `;
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
    expect(todoItem.collection.length).toBeGreaterThan(0);
  });

  test('remove item from list', () => {
    todoItem.removeBook(0);
    expect(todoItem.collection).toEqual([]);
    expect(todoItem.removeBook(0)).toBeFalsy();
  });
});
