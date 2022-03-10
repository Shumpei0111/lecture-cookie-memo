export class Task {
    constructor( body ) {
        this.id = ( () => {
            const now = Date.now();
            const hash = Math.floor( Math.random() * 101 );
            return `${now}_${hash}`;
        } )();

        this.isFinish = false;

        this.inputBody = body;
    }
}