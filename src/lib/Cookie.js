import Cookies from 'js-cookie';

/////////////////////////////
// 設定（できれば別モジュールに切り出してアプリ全体からクラスへ渡す方がいいと思います）
//
const Config = {
    constrains: {
        HISTORY_KEY: "task-history",
        TASK_KEY: "task-active",
        ENABLE_COOKIE_KEY: "enable-cookie",
    },
    options: {
        expires: 1
    },
};

const HISTORY_KEY = Config.constrains.HISTORY_KEY;
const TASK_KEY = Config.constrains.TASK_KEY;
const ENABLE_COOKIE_KEY = Config.constrains.ENABLE_COOKIE_KEY;



class CookieManager {
    constructor() {
        // Cookieが使用できるブラウザか確認する
        Cookies.set( "prepare", "set" );

        //////////////
        // use value
        // enable => "0"
        // disable => "-1"
        this.isEnableUseCookieKey = ENABLE_COOKIE_KEY;
        this.historyKey = HISTORY_KEY;
        this.taskKey = TASK_KEY;

        const getVal = Cookies.get( "prepare" );
        if( getVal ) {
            Cookies.remove( "prepare" );

        } else {
            alert( "お使いのブラウザではCookieが使用できないため、タスクの履歴を保存できません。ブラウザの設定をご確認ください。" );
            return;
        }
    }

    validUseCookie() {
        return this.checkEnableUseCookie();
    }

    checkEnableUseCookie() {
        return Cookies.get( this.isEnableUseCookieKey ) === "0";
    }

    setActiveTask( task ) {
        if( !this.validUseCookie() ) return;

        const _tasks = Cookies.get( this.taskKey );

        if( _tasks ) {
            Cookies.remove( this.taskKey );
        }

        const tasksItem = JSON.stringify( task );
        Cookies.set( this.taskKey, tasksItem, this.cookieOption );
    }

    setHistory( history ) {
        if( !this.validUseCookie() ) return;

        const _history = Cookies.get( this.historyKey );
        
        if( _history ) {
            Cookies.remove( this.historyKey );
        }

        const historyItem = JSON.stringify( history );
        Cookies.set( this.historyKey, historyItem, this.cookieOption );
    }

    loadTasks() {
        if( !this.validUseCookie() ) return;

        const _tasks = Cookies.get( this.taskKey );
        
        if( _tasks ) {
            return JSON.parse( _tasks );
        }
        return null;
    }

    loadHistory() {
        if( !this.validUseCookie() ) return;

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

    disebleUseCookie() {
        Cookies.set( this.isEnableUseCookieKey, "-1", this.cookieOption );
    }

    enableUseCookie() {
        console.log(this.cookieOption);
        Cookies.set( this.isEnableUseCookieKey, "0", this.cookieOption );
    }
}

export const cookieManager = new CookieManager;