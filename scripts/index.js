import { todoList, addTodo } from "./todo-list.js";

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoItem) => {
    const text = todoItem.text;
    const isChecked = todoItem.checked;
    
    todoListHTML += `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" ${isChecked ? 'checked': ''}>
        <p class="todo-text">${text}</p>
        <button class="update-todo-button">Update</button>
        <button class="remove-todo-button">Remove</button>
      </div>
    `;
  }); 

  document.querySelector('.js-todo-list-container')
    .innerHTML = todoListHTML;
}

document.querySelector('.js-add-button')
  .addEventListener('click', () => {
    const text = document.querySelector('.js-text-input').value;
    if(!text || text.replaceAll(' ', '') === '') return;
    addTodo(text);
    renderTodoList();
    document.querySelector('.js-text-input').value = '';
  });