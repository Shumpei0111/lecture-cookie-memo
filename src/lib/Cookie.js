import Cookies from 'js-cookie';

/////////////////////////////
// 設定（できれば別モジュールに切り出してアプリ全体からクラスへ渡す方がいいと思います）
//
const Config = {
    constrains: {
        LOGGED_IN_KEY: "logged-in",
        HISTORY_KEY: "task-history",
        TASK_KEY: "task-active",
        ENABLE_COOKIE_KEY: "enable-cookie",
    },
    options: {
        // expires / max-age ... ブラウザがCookieを保存する期限を設定。
        // ※js-cookieではexpiresを使用してください。
        // "max-age": 360000,  // 秒（0の場合はSessionCookie扱いになる）
        expires: 7,    // 日で指定（0の場合は保存されない）

        secure: true,  // HTTPSでしかCookieを送信しないようにする
        sameSite: "lax" // XSRF攻撃対策 GETリクエストかつ、ブラウザのロケーションバーが変更される時に送られるCookie
    },
};

const LOGGED_IN_KEY = Config.constrains.LOGGED_IN_KEY;
const HISTORY_KEY = Config.constrains.HISTORY_KEY;
const TASK_KEY = Config.constrains.TASK_KEY;
const ENABLE_COOKIE_KEY = Config.constrains.ENABLE_COOKIE_KEY;



class CookieManager {
    constructor() {
        // Cookieが使用できるブラウザか確認する
        Cookies.set( "prepare", "set" );

        this.isEnableUseCookieKey = ENABLE_COOKIE_KEY; // enable => "0" | disable => "-1"

        this.isLoggedInKey = LOGGED_IN_KEY; // true => "0" | false => null
        this.historyKey = HISTORY_KEY;
        this.taskKey = TASK_KEY;

        this.cookieOption = Object.assign( {}, Config.options );

        const getVal = Cookies.get( "prepare" );
        if( getVal ) {
            Cookies.remove( "prepare" );

        } else {
            alert( "お使いのブラウザではCookieが使用できないため、タスクの履歴を保存できません。ブラウザの設定をご確認ください。" );
            return;
        }
    }

    checkValidLoggedIn() {
        return Cookies.get( this.isLoggedInKey ) === "0";
    }

    validLoggedIn() {
        Cookies.set( this.isLoggedInKey, "0" );
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