export const todoList = [{
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