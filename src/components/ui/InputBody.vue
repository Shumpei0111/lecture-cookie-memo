<template>
    <div class="input-body flex">
        <input type="text" name="memoBody" id="memoBody" v-model="inputValue" @keydown.enter="saveTask">
        <button type="button" @click="emitSaveTask">タスクを登録する</button>
    </div>
</template>

<script>
export default {
    name: "InputBody",
    props: {
        value: String,
        emitSaveTask: Function,
    },
    computed: {
        inputValue: {
            get() {
                return this.value;
            },
            set( newVal ) {
                this.$emit( "input", newVal );
            }
        }
    },
    methods: {
        saveTask: function( ev ) {
            // 日本語入力中(keyCode:229)は送信しないようにする
            if( ev.keyCode !== 13 ) return;
            this.emitSaveTask();
        },
    },
}
</script>

<style lang="scss">
.input-body {
    margin: 24px auto;

    #memoBody {
        width: 300px;
        padding: 4px 6px;
    }

    button {
        font-size: 1.4rem;
        padding: 2px 16px;
        cursor: pointer;
    }
}
</style>