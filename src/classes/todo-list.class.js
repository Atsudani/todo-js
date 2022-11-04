import { Todo } from "./todo.class";

export class TodoList{

    todos;
    
    constructor(){
        //this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarTodo(codigo){
        this.todos = this.todos.filter(todo => todo.id != codigo);
        this.guardarLocalStorage();
    }

    marcarCompletado(id){
        for (const todo of this.todos) {
            if (todo.id == id) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados(){
        this.todos = this.todos.filter(todo => !todo.completado);
        this.guardarLocalStorage();
    }

    eliminarItem(id){
        
   
        this.todos = this.todos.filter(todo => todo.id != id);
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos) );  //covierte a JSON el arreglo que le paso.
    }

    cargarLocalStorage(){
        // if (localStorage.getItem('todo')) {
        //     this.todos = JSON.parse(localStorage.getItem('todo'));
        // }else{
        //     this.todos = [];
        // }
        

        //inserto en el arreglo como objeto {..}
        this.todos = (localStorage.getItem('todo')) 
                        ? JSON.parse(localStorage.getItem('todo')) 
                        : [];

        //recorro el array y lo convierto en un objeto de TODO                
        this.todos = this.todos.map( obj => Todo.fromJson(obj));
        //lo puedo simplificar asi
        //this.todos = this.todos.map( Todo.fromJson );
    }



}

