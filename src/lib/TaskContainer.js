export class TaskContainer {
    constructor() {
        this.allTasks = [];
        this.history = [];
    }

    addTask( task ) {
        this.allTasks.unshift( task );
        this.history.unshift( { id: task.id, status: "add"} );
    }

    finishTask( checked, id ) {
        const self = this;

        self.allTasks.filter( task => {
            return task.id === id;
        } )
        .map( task => {
            task.isFinish = true;
            return task;
        } );

        for( let i = 0, len = self.history.length; i < len; i++ ) {
            let task = self.history[ i ];
            if( task.id === id ) {
                const status = checked === true ? "finish" : "back";
                self.history.unshift( { id: task.id, status: status } );
                break;
            }
        }
    }
}