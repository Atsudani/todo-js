import './styles.css';
import {Todo,TodoList} from './classes';
import { crearTodoHtml } from './js/componentes';
//si no especifico la clase entonces importa por defecto el index


export const todoList = new TodoList(); //este arreglo voy a exportar para que pueda ser accedido desde el archivo componentes.js


todoList.todos.forEach(crearTodoHtml);




//console.log('resultados de ToDos', todoList.todos);


// const tarea1 = new Todo('Inventiva insertado desde el Index');



// tarea1.completado = false;

// crearTodoHtml(tarea1); //dibujar en el html

//localStorage.setItem('mi-key','puto');

// setTimeout(() => {
//     localStorage.removeItem('mi-key');
// },3500);

//es lo mismo que todo => crearTodoHtml(todo), se puede resumir cuando se envia solo un argumento


//console.log(todoList);
