import { todoList, addTodo, saveTodoList, removeTodo } from "./todo-list.js";

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoItem, index) => {
    const text = todoItem.text;
    const isChecked = todoItem.checked;
    
    todoListHTML += `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" ${isChecked ? 'checked': ''}>
        <p class="todo-text">${text}</p>
        <button class="update-todo-button">Update</button>
        <button class="remove-todo-button js-remove-todo-button" data-index="${index}">Remove</button>
      </div>
    `;
  }); 

  document.querySelector('.js-todo-list-container')
    .innerHTML = todoListHTML;

  document.querySelectorAll('.js-remove-todo-button')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const index = element.dataset.index;
        removeTodo(index);
        renderTodoList();
      });
    });
    
}

document.querySelector('.js-add-button')
  .addEventListener('click', () => {
    const text = document.querySelector('.js-text-input').value;
    if(!text || text.replaceAll(' ', '') === '') return;
    addTodo(text);
    saveTodoList();
    renderTodoList();
    document.querySelector('.js-text-input').value = '';
  });