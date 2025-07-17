import { todoList, addTodo, saveTodoList, removeTodo, removeChecked, quantityTodoChecked } from "./todo-list.js";

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  console.log(todoList);

  todoList.forEach((todoItem, index) => {
    const text = todoItem.text;
    const isChecked = todoItem.checked;
    
    todoListHTML += `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox js-todo-checkbox" ${isChecked ? 'checked': ''} data-index="${index}">
        <p class="todo-text ${isChecked ? 'todo-done': ''}">${text}</p>
        <button class="update-todo-button">Update</button>
        <button class="remove-todo-button js-remove-todo-button" data-index="${index}">Remove</button>
      </div>
    `;
  }); 

  document.querySelector('.js-todo-list-container')
    .innerHTML = todoListHTML;

  // Make interactive the remove button
  document.querySelectorAll('.js-remove-todo-button')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const index = element.dataset.index;
        removeTodo(index);
        saveTodoList();
        renderTodoList();
      });
    });
    
  //Make interactive the checkbox
  document.querySelectorAll('.js-todo-checkbox')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const index = element.dataset.index;
        todoList[index].checked = element.checked;
        saveTodoList();
        renderTodoList();
      });
    });

  //progress bar
  const progress = (quantityTodoChecked() / todoList.length) * 100 || 0;
  document.querySelector('.js-progress-bar').style.width = `${progress}%`;
  document.querySelector('.js-progress-text')
    .innerHTML = `${quantityTodoChecked()} of ${todoList.length} task completed`;

}

const textInputElem = document.querySelector('.js-text-input');

function submitTodo() {
  const text = textInputElem.value;
  if(!text || text.replaceAll(' ', '') === '') return;
  addTodo(text);
  saveTodoList();
  renderTodoList();
  textInputElem.value = '';
}

//Make interactive the add button
document.querySelector('.js-add-button')
  .addEventListener('click', () => {
    submitTodo();
  });

// Add todo pressing enter on the text input
textInputElem.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
      submitTodo();
    }
  });

//Make interactive the remove checked button
document.querySelector('.js-remove-checked-button').
  addEventListener('click', () => {
    removeChecked();
    saveTodoList();
    renderTodoList();
  });