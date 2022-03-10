<template>
    <div class="list">
        <h3>タスクリスト</h3>
        <ul class="task">
            <li class="task__item" v-for="task in allTasks" :key="task.id">
                <div class="task__body">
                    <input type="checkbox" name="taskDone" id="taskDone" @change="watchInputStatus( $event, task.id )">
                    <span>{{ task.inputBody }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "List",
    props: {
        allTasks: Array,
        emitFinishTask: Function
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