import { Task } from '../classes';

import { todo } from '../../index.js';

// Referencias HTML
const ul_list = document.querySelector( '.todo-list' );
const ul_filters = document.querySelector( '.filters' );
const input_txt = document.querySelector( '.new-todo' );
const button_clear_list = document.querySelector( '.clear-completed' );
const anchor_filter = document.querySelectorAll( '.filtro' );
const span_counter = document.querySelector( '.todo-count' );

export const createTaskItem = ( task ) => {
    const html_task_item = `
    <li ${ ( task.done ) ? 'class="completed"' : '' } data-id="${ task.id }">
		<div class="view">
			<input class="toggle" type="checkbox" ${ ( task.done ) ? 'checked' : '' }>
			<label>${ task.description }</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>
    `;

    const div = document.createElement( 'div' );
    div.innerHTML = html_task_item;

    ul_list.append( div.firstElementChild );

    return div.firstElementChild;
}

export const incrementCounter = ( done ) => {
    let counter = parseInt( span_counter.firstChild.innerHTML );
    if ( !done ) counter++
    span_counter.firstChild.innerHTML = counter.toString();
}

export const decrementCounter = ( done ) => {
    let counter = parseInt( span_counter.firstChild.innerHTML );
    if ( done ) counter--;
    span_counter.firstChild.innerHTML = counter.toString();
}

// Eventos
input_txt.addEventListener( 'keyup', () => {
    if ( event.keyCode === 13 && input_txt.value.length > 0 ) {
        const task = new Task( input_txt.value );
        todo.addTask( task );
        input_txt.value = '';
        createTaskItem( task );
    }
} );

ul_list.addEventListener( 'click', ( event ) => {
    const localName = event.target.localName;
    const taskItem = event.target.parentElement.parentElement;
    const taskId = taskItem.getAttribute( 'data-id' );

    if ( localName.includes( 'input' ) ) {
        todo.checkTask( taskId );
        taskItem.classList.toggle( 'completed' );
    } else if ( localName.includes( 'button' ) ) {
        todo.popTask( taskId );
        ul_list.removeChild( taskItem );
    }
} );

button_clear_list.addEventListener( 'click', () => {
    let completed_tasks = ul_list.getElementsByClassName( 'completed' );
    todo.deleteCompleted();
    for( let i = completed_tasks.length - 1; i >= 0; i-- ) {
        let task_done = completed_tasks.item( i );
        localStorage.removeItem( task_done.getAttribute( 'data-id' ) );
        ul_list.removeChild( task_done );
    }
} );

ul_filters.addEventListener( 'click', ( event ) => {
    const localName = event.target.localName; 
    if ( localName.includes( 'a' ) ) {
        const filter = event.target.attributes.href.value;

        anchor_filter.forEach( elem => elem.classList.remove( 'selected' ) );
        event.target.classList.add( 'selected' );

        for( const element of ul_list.children ){
            
            element.classList.remove( 'hidden' );
            const completed = element.classList.contains( 'completed' );

            switch ( filter ) {
                case '#/active':
                    if ( completed ) {
                        element.classList.add( 'hidden' );
                    }
                break;
                case '#/completed':
                    if ( !completed ) {
                        element.classList.add( 'hidden' );
                    }
                break;
            }
        }
    }
    
} )