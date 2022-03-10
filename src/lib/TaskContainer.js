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

        // タスク全体を更新
        // Vueが検知できるようリアクティブにするため、spliceで配列内のチェックボックスの判定を行う
        let index = self.allTasks.findIndex( task => task.id === id );
        let finishTask = self.allTasks[ index ];
        finishTask.isFinish =! finishTask.isFinish;
        self.allTasks.splice( index, 1, finishTask );

        // 履歴を更新
        for( let i = 0, len = self.history.length; i < len; i++ ) {
            let task = self.history[ i ];
            if( task.id === id ) {
                const status = checked === true ? "finish" : "back";
                self.history.unshift( { id: task.id, status: status } );
                break;
            }
        }
    }

    clearAllTasks() {
        // Vueが検知できるようsplice(0)で配列を空にする
        this.allTasks.splice( 0 );
    }

    clearAllHistory() {
        // Vueが検知できるようsplice(0)で配列を空にする
        this.history.splice( 0 );
    }

    allClear() {
        this.clearAllTasks();
        this.clearAllHistory();
    }
}