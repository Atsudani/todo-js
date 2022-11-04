import { todoList } from "..";

export class Todo{
    constructor(tarea){
        this.tarea = tarea;
        this.id = new Date().getTime();
        this.completado = false;
        this.fecha_creado = new Date();
    }

    static fromJson({id, tarea, completado, creado}){
        const tempTodo = new Todo(tarea);

        tempTodo.id         = id;
        tempTodo.completado = completado;
        tempTodo.creado     = creado;

        return tempTodo;
    }

    imprimirClase(){
        console.log(`${this.tarea} - ${this.id}`);
    }
}