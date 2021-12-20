import { Todo } from "./todo.class";

export class TodoList {
	constructor() {
		//this.todos = [];
		this.CargarLocalStorage();
	}
	nuevoTodo(todo) {
		this.todos.push(todo);
		this.guardarLocalStorage();
	}

	eliminarTodo(id) {
		this.todos = this.todos.filter((todo) => todo.id != id);
		//devuelvo un array con todos los valores que sean distintos al id, para asi eliminarlo del mismo

		this.guardarLocalStorage();
	}

	marcarCompletado(id) {
		for (const todo of this.todos) {
			if (todo.id == id) {
				todo.completado = !todo.completado;
				this.guardarLocalStorage();
				break; //salgo del ciclo porque interpreto que no va a haber otro todo con el mismo id
			}
		}
	}

	eliminarCompletados() {
		this.todos = this.todos.filter((todo) => !todo.completado);
		//devuelvo un array con todos los valores que sean distintos al id, para asi eliminarlo del mismo
		this.guardarLocalStorage();
	}

	guardarLocalStorage() {
		localStorage.setItem("todo", JSON.stringify(this.todos));
	}

	CargarLocalStorage() {
		this.todos = localStorage.getItem("todo")
			? JSON.parse(localStorage.getItem("todo"))
			: [];

		/*if (localStorage.getItem("todo")) {
			this.todos = JSON.parse(localStorage.getItem("todo"));
		} else {
			this.todo = [];
		} */

		this.todos = this.todos.map((obj) => Todo.fromJson(obj));
	}
}
