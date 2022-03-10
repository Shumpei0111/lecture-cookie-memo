<template>
    <div class="list">
        <h3>タスクリスト</h3>
        <ul class="task">
            <li class="task__item" v-for="task in allTasks" :key="task.id">
                <div class="task__body">
                    {{ task.inputBody }}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "List",
    props: {
        allTasks: Array
    },
    computed: {
    },
}
</script>