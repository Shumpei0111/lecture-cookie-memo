<template>
    <div id="taskContainer">
        <div>
            <label for="enableCookie">Cookieを有効にする</label>
            <input type="checkbox" id="enableCookie" @change="toggleEnableCookie( $event )" :checked="isEnableCookie">
        </div>
        <input-body v-model="inputValue" :emit-save-task="saveTask" />
        <div class="app-body">
            <list :all-tasks="allTasks" :emit-finish-task="finishTask" :clear-all-tasks="clearAllTasks" />
            <history :history="history" :task-pairs="taskPairs" :clear-all-history="clearAllHistory" />
        </div>
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
            isEnableCookie: false,
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
        toggleEnableCookie: function( ev ) {
            if( !ev.target.checked ) {
                cookieManager.allClear();
                cookieManager.disebleUseCookie();
                return;
            }

            cookieManager.enableUseCookie();
            cookieManager.setActiveTask( this.allTasks );
            cookieManager.setHistory( this.history );
        },

        checkEnableCookie: function() {
            const canUseCookie = cookieManager.checkEnableUseCookie();
            if( !canUseCookie ) {
                this.isEnableCookie = false;
                return;
            }

            this.isEnableCookie = true;
        },

        saveTask: function() {
            if( this.inputValue === "" ) return;

            const task = new Task( this.inputValue );
            taskContainer.addTask( task );
            this.inputValue = "";
        },

        finishTask: function( event, id ) {
            taskContainer.finishTask( event, id );
        },

        clearAllTasks: function() {
            taskContainer.allClear();
            cookieManager.allClear();
        },

        clearAllHistory: function() {
            taskContainer.clearAllHistory();
            cookieManager.clearAllHistory();
        },
        
        initHistory: function() {
            this.checkEnableCookie();

            const loadTasks = cookieManager.loadTasks();
            const loadHistory = cookieManager.loadHistory();

            if( this.isEnableCookie && loadTasks && loadTasks.length > 0 ) {
                loadTasks.map( task => {
                    taskContainer.allTasks.push( task );
                } );
            }

            if( this.isEnableCookie && loadHistory && loadHistory.length > 0 ) {
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


<style lang="scss">
#taskContainer {

    .app-body {
        display: flex;
    }
}
</style>