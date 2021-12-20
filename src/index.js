import { Todo, TodoList } from "./classes"; //cuando no especifico el archivo, busca el index.js
import { crearTodoHTML } from "./js/componentes";

import "./styles.css";

export const todoList = new TodoList();

todoList.todos.forEach((todo) => {
	crearTodoHTML(todo);
});
//forma reducida de la misma funcion
/* todoList.todos.forEach(crearTodoHTML); */
