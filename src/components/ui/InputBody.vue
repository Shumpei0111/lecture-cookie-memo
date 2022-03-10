<template>
    <div class="input-body">
        <input type="text" name="memoBody" id="memoBody" v-model="inputValue" @keydown.enter="emitSaveTask">
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
}
</script>

<style lang="scss">
.input-body {
    margin: 24px auto;
    display: flex;

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