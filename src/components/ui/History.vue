<template>
    <div class="history">
        <div class="mb flex align-item-center">
            <h3>履歴</h3>
            <button class="clear-button" @click="clearAllHistory">履歴全消去</button>
        </div>
        <ul class="task-history">
            <li class="task-history__item" v-for="( task, index ) in history" :key="index">
                <div class="task-history__body"><span class="bold task-body">{{ getInputBody( task.id ) }}</span>を<span :class="[ 'task-status', getStatusClass( task.status ) ]">{{ getStatusText( task.status ) }}</span>しました</div>
            </li>
        </ul>
    </div>
</template>

<script>
import { cookieManager } from '../../lib/Cookie.js';

export default {
    name: "History",
    props: {
        history: Array,
        taskPairs: Array,
        clearAllHistory: Function,
    },
    watch: {
        history: function( newArr ) {
            cookieManager.setHistory( newArr );
        },
    },
    methods: {
        getInputBody: function( id ) {
            const taskPairs = this.taskPairs.slice();

            const res = taskPairs.filter( task => {
                return task.id === id;
            } );
            return res[0].inputBody;
        },
        getStatusText: function( status ) {
            if( status === "add" ) {
                return "追加";
            }
            if( status === "finish" ) {
                return "完了";
            }
            if( status === "back" ) {
                return "復帰";
            }
            if( status === "allClear" ) {
                return "全て消去";
            }
        },
        getStatusClass: function( status ) {
            if( status === "add" ) {
                return "task-add";
            }
            if( status === "finish" ) {
                return "task-finish";
            }
            if( status === "back" ) {
                return "task-back";
            }
            if( status === "allClear" ) {
                return "all-clear";
            }
        },
    }
}
</script>

<style lang="scss">
.history {
    margin-bottom: 24px;
    width: 50%;

    .task-history {
        list-style-type: none;

        .task-history__item {
            margin-bottom: 16px;
        }

        .task-history__item:first-of-type {
            .task-history__body::before {
                content: "new";
                color: red;
                margin-left: -32px;
                padding-right: 4px;
            }
        }

        .task-body {
            margin: 0 3px 0 0;
            text-decoration: underline;
        }

        .task-status {
            font-size: 1rem;
            border: 1px solid;
            border-radius: 3px;
            padding: 2px;
            margin: 0 2px;
            vertical-align: top;
        }

        .task-add {
            color: blue;
        }

        .task-finish {
            color: red;
        }

        .task-back {
            color: green;
        }
    }
}
</style>