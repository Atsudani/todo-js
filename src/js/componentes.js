
//Referencias en el HTML

import { Todo } from '../classes';
import { todoList } from '../index';

//seleccionar el html para manipular insertando codigo javascript..
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div'); //<div></div>
    div.innerHTML = htmlTodo;

    //lo que hace..
    // <div>
    //     htmlTodo
    // </div>

    // a la clase todo-list agrego el bloque html que acabo de crear.. "htmlTodo"
    divTodoList.append(div.firstElementChild);

    return div;
}

//Eventos
txtInput.addEventListener('keyup',(event) => {
    //console.log(event);

    //si presiono enter
    if (event.keyCode === 13 && txtInput.value.length > 0) {

        //console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);

        todoList.nuevoTodo(nuevoTodo);

        //console.log(todoList);
        //console.log(nuevoTodo);

        crearTodoHtml(nuevoTodo);

        txtInput.value = '';
    }

});

divTodoList.addEventListener('click',(event) => {
    //console.log('click');
    const nombreElemento = event.target.localName; //input, label, button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    //console.log(todoElemento);

/* este es todoElemento
    <li class="" data-id="1667415111875">
        
        <div class="view">
            <input class="toggle" type="checkbox">
            <label>Inventiva insertado desde el Index</label>
            <button class="destroy"></button>
        </div><input class="edit" value="Create a TodoMVC template">
    </li>
*/

    //console.log(todoId);

    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')){
        // todoList.eliminarCompletados(todoId);
        todoList.eliminarItem(todoId);
        divTodoList.removeChild(todoElemento);
    }

    console.log(todoList);
});

btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();

    for(let i = divTodoList.children.length -1; i>=0; i--){
        const elemento = divTodoList.children[i];

        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);            
        }
    }
});

ulFiltros.addEventListener('click',(event) => {
    console.log(event.target.text);
    const filtro = event.target.text;

    //console.log('haaaa',anchorFiltros);
    //recorro los elementos que tienen la clase filtro y le quito su clase selected
    anchorFiltros.forEach(elemento => elemento.classList.remove('selected'));

    //le asigno la clase select al filtro seleccionado
    event.target.classList.add('selected');
    //anchorFiltros.forEach();

    //si no hace click en uno de los filtros, entonces salimos del evento click..
    if (!filtro) { return; }


    //recorrer los elementos del divTodoList
    for (const elemento of divTodoList.children) {
        //console.log(elemento);

        //eliminar la clase hidden para que las listas queden limpias.
        elemento.classList.remove('hidden');
        //preguntar si el elemento tiene la clase completed.. contains retorna boolean
        const completado = elemento.classList.contains('completed');

        /**
         * Evaluar
         *      si damos click en PENDIENTES y el elemento esta COMPLETADO entonces le agregamos la clase hidden
         *      si damos click en COMPLETADOS y el elemento no esta COMPLETADO entonces le agremos la clase hidden
         * 
         * De esta manera solo mostramos los que no tienen el filtro HIDDEN
         * 
         * Si se da click en TODOS entonces no se va evaluar ninguno de los casos, por lo tanto se van a mostrar todos los elementos.
        */
        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
                case 'Completados':
                    if (!completado) {
                        elemento.classList.add('hidden');
                    }
                    break;
            default:
                break;
        }
    }
});
