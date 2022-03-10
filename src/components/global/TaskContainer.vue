<template>
    <div id="taskContainer">
        <input-body v-model="inputValue" :emit-save-task="saveTask" />
        <list :all-tasks="allTasks" :emit-finish-task="finishTask" />
        <history :history="history" :task-pairs="taskPairs" />
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
    },
    methods: {
        saveTask: function() {
            const task = new Task( this.inputValue );

            taskContainer.addTask( task );

            this.inputValue = "";
        },

        finishTask: function( event, id ) {
            taskContainer.finishTask( event, id );
        }
    },

}
</script>