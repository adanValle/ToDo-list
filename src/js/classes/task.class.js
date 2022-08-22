export class Task {

    constructor( description ){
        this.id = new Date().getTime();
        this.description = description;
        this.date = new Date();
        this.done = false;
    }

}