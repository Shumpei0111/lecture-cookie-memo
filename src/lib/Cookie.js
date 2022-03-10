import Cookies from 'js-cookie';

class CookieManager {
    constructor() {
        // Cookieが使用できるブラウザか確認する
        Cookies.set( "prepare", "set" );
        this.canUseCookies = false;
        this.historyKey = "task-history";
        this.taskKey = "task-active";

        const getVal = Cookies.get( "prepare" );
        if( getVal ) {
            Cookies.remove( "prepare" );
            this.canUseCookies = true;

        } else {
            alert( "お使いのブラウザではCookieが使用できないため、タスクの履歴を保存できません。ブラウザの設定をご確認ください。" );
            return;
        }
    }

    setActiveTask( task ) {
        if( !this.canUseCookies ) return;

        const _tasks = Cookies.get( this.taskKey );

        if( _tasks ) {
            Cookies.remove( this.taskKey );
        }

        const tasksItem = JSON.stringify( task );
        Cookies.set( this.taskKey, tasksItem );
    }

    setHistory( history ) {
        if( !this.canUseCookies ) return;

        const _history = Cookies.get( this.historyKey );
        
        if( _history ) {
            Cookies.remove( this.historyKey );
        }

        const historyItem = JSON.stringify( history );
        Cookies.set( this.historyKey, historyItem );
    }

    loadTasks() {
        const _tasks = Cookies.get( this.taskKey );
        
        if( _tasks ) {
            return JSON.parse( _tasks );
        }
        return null;
    }

    loadHistory() {
        const _history = Cookies.get( this.historyKey );

        if( _history ) {
            return JSON.parse( _history );
        }
        return null;
    }

    clearAllTasks() {
        const _tasks = Cookies.get( this.taskKey );
        
        if( _tasks ) {
            Cookies.remove( this.taskKey );
        }
    }

    clearAllHistory() {
        const _history = Cookies.get( this.historyKey );

        if( _history ) {
            Cookies.remove( this.historyKey );
        }
    }

    allClear() {
        this.clearAllTasks();
        this.clearAllHistory();
    }
}

export const cookieManager = new CookieManager;