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

        let index = self.allTasks.findIndex( task => task.id === id );
        let finishTask = self.allTasks[ index ];
        finishTask.isFinish =! finishTask.isFinish;
        self.allTasks.splice( index, 1, finishTask );

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