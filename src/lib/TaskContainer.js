export class TaskContainer {
    constructor() {
        this.allTasks = [];
        this.history = [];
    }

    addTask( task ) {
        this.allTasks.push( task );
        this.history.push( { id: task.id, state: "add" } );
    }

    finishTask( id ) {
        this.allTasks.filter( task => {
            return task.id === id;
        } )
        .map( task => {
            task.isFinish = true;
            return task;
        } );
    
        this.history.filter( task => {
            return task.id === id;
        } )
        .map( task => {
            task.state = "finish";
        } );
    }
}