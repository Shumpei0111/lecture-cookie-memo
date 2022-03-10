<template>
    <div class="history">
        <h3>履歴</h3>
        <ul>
            <li v-for="task in history" :key="task.id">
                <p><span class="bold">{{ getInputBody( task.id ) }}</span>を<span class="bold">{{ getStatusText( task ) }}</span>しました</p>
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
                console.log(task, id);
                return task.id === id;
            } );
            return res[0].inputBody;
        },
        getStatusText: function( task ) {
            console.log(task);
            if( task.state === "add" ) {
                return "追加";
            }
            if( task.state === "finish" ) {
                return "完了";
            }
        },
    }
}
</script>

<style lang="scss">
.bold {
    font-weight: bold;
}
</style>