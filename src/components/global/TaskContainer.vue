<template>
    <div id="taskContainer">
        <input-body v-model="inputValue" :parent-method="saveTask" />
        <list :all-tasks="reverseAllTasks" />
        <history :history="reverseHistory" :task-pairs="taskPairs" />
    </div>
</template>

<script>
import List from '@/components/ui/List.vue';
import History from '@/components/ui/History.vue';
import InputBody from '@/components/ui/InputBody.vue';

import { TaskContainer } from '../../lib/TaskContainer.js';
import { Task } from '../../lib/Task.js';

const taskContainer = new TaskContainer();

export default {
    name: "TaskContainer",
    components: {
        List,
        History,
        InputBody
    },
    data() {
        return {
            inputValue: "",
            allTasks: taskContainer.allTasks,
            history: taskContainer.history,
        }
    },
    computed: {
        taskPairs: function() {
            return this.allTasks.map( task => {
                return {
                    id: task.id,
                    inputBody: task.inputBody 
                }
            } );
        },
        reverseAllTasks: function() {
            return this.allTasks.reverse();
        },
        reverseHistory: function() {
            return this.history.reverse();
        },
    },
    methods: {
        saveTask: function() {
            const task = new Task( this.inputValue );

            taskContainer.addTask( task );

            this.inputValue = "";
        },

        finishTask: function( id ) {
            taskContainer.finishTask( id );
        }
    },

}
</script>