import { Todo } from "../classes";
import { todoList } from "../index";

const divTodoList = document.querySelector(".todo-list");
const txtInput = document.querySelector(".new-todo");
const btnBorrar = document.querySelector(".clear-completed");
const ulFiltros = document.querySelector(".filters");
const aFiltros = document.querySelectorAll(".filtro");
export const crearTodoHTML = (todo) => {
	const htmlTodo = `
    <li class=" ${todo.completado ? "completed" : ""}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${
							todo.completado ? "checked" : ""
						}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;
	const div = document.createElement("div");
	div.innerHTML = htmlTodo;
	divTodoList.append(div.firstElementChild); //inserta el primer hijo del div que cree, o sea el li

	return div.firstElementChild;
};

//Eventos

txtInput.addEventListener("keyup", (event) => {
	if (event.keyCode === 13 && txtInput.value.length > 0) {
		const nuevoTodo = new Todo(txtInput.value);
		todoList.nuevoTodo(nuevoTodo);
		crearTodoHTML(nuevoTodo);
		txtInput.value = "";
	}
});

divTodoList.addEventListener("click", (event) => {
	const nombreElemento = event.target.localName; //va a ser el input, el label o el boton de la tarea
	const todoElemento = event.target.parentElement.parentElement; //llego al li
	const todoId = todoElemento.getAttribute("data-id");

	if (nombreElemento.includes("input")) {
		//si hizo click en el check
		todoList.marcarCompletado(todoId);
		todoElemento.classList.toggle("completed");
	}
	if (nombreElemento.includes("button")) {
		//si hizo click en el boton X
		todoList.eliminarTodo(todoId); //le paso el id para eliminarlo de la lista
		divTodoList.removeChild(todoElemento); // elimino el elemento del html
	}
});

btnBorrar.addEventListener("click", () => {
	//elimino los completados del array
	todoList.eliminarCompletados();

	//elimino los completados del html
	for (let i = divTodoList.children.length - 1; i >= 0; i--) {
		const elemento = divTodoList.children[i];
		if (elemento.classList.contains("completed")) {
			divTodoList.removeChild(elemento);
		}
	}
});

ulFiltros.addEventListener("click", (event) => {
	const filtro = event.target.text;
	if (!filtro) {
		return;
	}
	//// le aplica el borde al filtro seleccionado
	aFiltros.forEach((elem) => {
		elem.classList.remove("selected");
	});
	event.target.classList.add("selected");

	//// aplica el filtro dependiendo en cual haga click
	for (const elemento of divTodoList.children) {
		elemento.classList.remove("hidden");
		const completado = elemento.classList.contains("completed");

		switch (filtro) {
			case "Pendientes":
				if (completado) {
					elemento.classList.add("hidden");
				}
				break;

			case "Completados":
				if (!completado) {
					elemento.classList.add("hidden");
				}
				break;
		}
	}
});
