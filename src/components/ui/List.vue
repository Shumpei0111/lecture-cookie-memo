<template>
    <div class="list">
        <h3>タスクリスト</h3>
        <ul class="task">
            <li class="task__item" v-for="task in allTasks" :key="task.id">
                <div class="task__body">
                    <input
                        type="checkbox"
                        name="taskDone"
                        :id="`taskDone_${task.id}`"
                        :checked="task.isFinish"
                        @change="watchInputStatus( $event, task.id )"
                    >
                    <label :for="`taskDone_${task.id}`">{{ task.inputBody }}</label>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { cookieManager } from '../../lib/Cookie.js';

export default {
    name: "List",
    props: {
        allTasks: Array,
        emitFinishTask: Function
    },
    watch: {
        allTasks: function( newArr ) {
            console.log("change");
            cookieManager.setActiveTask( newArr );
        },
    },
    methods: {
        watchInputStatus: function( e, id ) {
            this.emitFinishTask( e.target.checked, id );
        },
    }
}
</script>

<style lang="scss">
.list {
    margin-bottom: 24px;

    .task {

        .task__item {
            margin-bottom: 8px;
        }

        .task__body {
            display: flex;

            input {
                margin-right: 4px;
            }
        }
    }
}
</style>