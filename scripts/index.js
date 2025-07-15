import { todoList } from "./todo-list.js";

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

  document.querySelector('.js-task-list-container')
    .innerHTML = todoListHTML;
}

renderTodoList();