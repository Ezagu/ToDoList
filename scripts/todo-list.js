export const todoList = JSON.parse(localStorage.getItem('todo-list')) || [{
  checked: false,
  text: 'Watch a movie'
}, {
  checked: true,
  text: 'Clean the house'
},{
  checked: true,
  text: 'Buy groceries'
},{
  checked: false,
  text: 'Learn Angular.js'
}]

export function addTodo(text) {
  todoList.unshift({
    checked: false,
    text
  })
}

export function saveTodoList() {
  localStorage.setItem('todo-list', JSON.stringify(todoList));
}

export function removeTodo(index) {
  todoList.splice(index, 1);
}

export function updateText(index, text) {
  todoList[index].text = text;
}

export function removeChecked() {
  const todolistLength = todoList.length;
  todoList.slice().reverse().forEach((todoItem, index) => {
    const i = todolistLength - 1 - index;
    if(todoItem.checked) {
      removeTodo(i);
    }
  });
}

export function quantityTodoChecked() {
  let counter = 0;
  todoList.forEach((todoItem) => {
    if(todoItem.checked) {
      counter++;
    }
  });
  return counter;
}