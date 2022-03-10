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
import { cookieManager } from '../../lib/Cookie.js';

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
        },
        
        initHistory: function() {
            const loadTasks = cookieManager.loadTasks();
            console.log(loadTasks);
            const loadHistory = cookieManager.loadHistory();

            if( loadTasks && loadTasks.length > 0 || loadTasks ) {
                loadTasks.map( task => {
                    taskContainer.allTasks.push( task );
                } );
            }

            if( loadHistory && loadHistory.length > 0 || loadHistory ) {
                loadHistory.map( task => {
                    taskContainer.history.push( task );
                } );
            }
        },
    },
    mounted: function() {
        this.initHistory();
    },

}
</script>