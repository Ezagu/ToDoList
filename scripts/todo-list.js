export const todoList = JSON.parse(localStorage.getItem('todo-list')) || [{
  checked: true,
  text: 'watch youtube'
}, {
  checked: false,
  text: 'go to the university'
},{
  checked: true,
  text: 'play videogame'
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