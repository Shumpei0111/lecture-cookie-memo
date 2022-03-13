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
        ///////////////////////////////
        // タスク全体を更新
        //
        // Vueが検知できるようリアクティブにするため、spliceで配列内のチェックボックスの判定を行う
        let index = this.allTasks.findIndex( task => task.id === id );
        let finishTask = this.allTasks[ index ];
        finishTask.isFinish =! finishTask.isFinish;
        this.allTasks.splice( index, 1, finishTask );


        ///////////////////////////////
        // 履歴を更新
        // タスク登録と履歴登録が同時の場合
        let isExist = false;
        for( let i = 0, len = this.history.length; i < len; i++ ) {
            let task = this.history[ i ];
            if( task.id === id ) {
                const status = checked === true ? "finish" : "back";
                this.history.unshift( { id: task.id, status: status } );
                isExist = true;
                break;
            }
        }

        if( isExist ) return;
        
        // 履歴に何もないか全消去後
        if( this.history.length === 0 ) {
            const status = checked === true ? "finish" : "back";
            this.history.unshift( { id: id, status: status } );
            return;
        }

        // 履歴全消去後、すでに登録されているタスクが更新された場合
        if( !this.history.includes( id ) ) {
            const status = checked === true ? "finish" : "back";
            this.history.unshift( { id: id, status: status } );
            return;
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