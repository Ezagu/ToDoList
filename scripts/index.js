import { todoList, addTodo, saveTodoList, removeTodo, removeChecked, quantityTodoChecked, updateText } from "./todo-list.js";

let updating = false;

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoItem, index) => {
    const text = todoItem.text;
    const isChecked = todoItem.checked;
    
    todoListHTML += `
      <div class="todo-container">
        <p class="todo-text js-todo-text ${isChecked ? 'todo-done': ''} js-todo-text-${index}" data-index="${index}">
          ${text}
        </p>
        <button class="todo-button js-update-button" data-index=${index}>
          Update
        </button>
        <button class="todo-button js-remove-todo-button" data-index="${index}">
          Remove
        </button>
      </div>
    `;
  }); 

  document.querySelector('.js-todo-list-container')
    .innerHTML = todoListHTML;

  // Make interactive the remove button
  document.querySelectorAll('.js-remove-todo-button')
    .forEach((element) => {
      element.addEventListener('click', () => {
        if(updating) return;
        const index = element.dataset.index;
        removeTodo(index);
        saveTodoList();
        renderTodoList();
      });
    });
    
  //Make interactive the text of todo
  document.querySelectorAll('.js-todo-text')
    .forEach((textElem) => {
      textElem.addEventListener('click', () => {
        if (updating) return;
        const index = textElem.dataset.index;
        todoList[index].checked = !textElem.classList.contains('todo-done');
        saveTodoList();
        renderTodoList();
      });
    });

  //Make interactive the update button
  document.querySelectorAll('.js-update-button')
    .forEach((updateElem) => {
      const index = updateElem.dataset.index;
      const textElem = document.querySelector(`.js-todo-text-${index}`);
      const text = textElem.innerText;

      updateElem.addEventListener('click', () => {
        if(updating) {
          return;
        }
        else {
          updating = true;
        }
        updateElem.style.display = "none";

        // Create the input text
        textElem.innerHTML = `
          <input type="text" class="todo-input-update js-todo-input-update-${index}">
        `;
        const inputElem = document.querySelector(`.js-todo-input-update-${index}`);
        inputElem.value = text;
        inputElem.focus();

        // Make interactive the input in todo item when is updating
        inputElem.addEventListener('keydown',(event) => {
          if(event.key === 'Enter') {
            updating = false;
            textElem.innerHTML = inputElem.value;
            updateText(index, inputElem.value);
            saveTodoList();
            renderTodoList();
          }
        });

        // Create the save button
        const saveElem = document.createElement('button');
        saveElem.classList.add('todo-button');
        saveElem.innerText = 'Save';
        updateElem.parentElement.insertBefore(saveElem, updateElem.nextSibling);

        //Make interactive the save button
        saveElem.addEventListener('click', () => {
          updating = false;
          textElem.innerHTML = inputElem.value;
          updateText(index, inputElem.value);
          saveTodoList();
          renderTodoList();
        });
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