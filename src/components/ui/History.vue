<template>
    <div class="history">
        <h3>履歴</h3>
        <ul class="task-history">
            <li class="task-history__item" v-for="( task, index ) in history" :key="index">
                <div class="task-history__body"><span class="bold">{{ getInputBody( task.id ) }}</span>を<span class="bold">{{ getStatusText( task ) }}</span>しました</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "History",
    props: {
        history: Array,
        taskPairs: Array,
    },
    methods: {
        getInputBody: function( id ) {
            const taskPairs = this.taskPairs.slice();
            const res = taskPairs.filter( task => {
                return task.id === id;
            } );
            return res[0].inputBody;
        },
        getStatusText: function( task ) {
            if( task.status === "add" ) {
                return "追加";
            }
            if( task.status === "finish" ) {
                return "完了";
            }
            if( task.status === "back" ) {
                return "復帰";
            }
        },
    }
}
</script>

<style lang="scss">
.history {
    margin-bottom: 24px;
}
</style>