import { createTaskItem, incrementCounter, decrementCounter } from "../components/list-item.component";
import { Task } from "./task.class";

export class ToDo{

    static jsonToTask( persistent_task ){
        const task = new Task( persistent_task.description );
        task.id = persistent_task.id;
        task.date = persistent_task.date;
        task.done = persistent_task.done;

        return task;
    }

    constructor(){
        this.cargarLocalStorage();
    }

    addTask( task ){
        this.list.push( task );
        incrementCounter( task.done );
        this.guardarLocalStorage( task );
    }

    popTask( id ){
        const currentTask = this.getTaskById( id );
        decrementCounter( !currentTask.done );
        this.list = this.list.filter( task => task.id != id );
        localStorage.removeItem( id );
    }

    checkTask( id ){
        const currentTask = this.getTaskById( id );
        currentTask.done = !currentTask.done;
        this.guardarLocalStorage( currentTask );
        incrementCounter( currentTask.done );
        decrementCounter( currentTask.done );
    }

    getTaskById( id ) {
        for ( const task of this.list ) {
            if ( id == task.id ) {
                return task;
            }
        }
    }

    deleteCompleted(){
        this.list = this.list.filter( task => !task.done );
    }

    guardarLocalStorage( task ){
        localStorage.setItem( `${ task.id }`, JSON.stringify( task ) );
    }

    cargarLocalStorage(){
        this.list = [];
        if ( localStorage.length != 0 ) {
            for( let i = 0; i < localStorage.length; i++ ){
                const task = ToDo.jsonToTask( JSON.parse( localStorage.getItem( localStorage.key( i ) ) ) );
                this.list.push( task );
                createTaskItem( task );
                incrementCounter( task.done );
            }
        }
    }

}