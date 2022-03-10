<template>
    <div class="input-body">
        <input type="text" name="memoBody" id="memoBody" v-model="inputValue" @keydown.enter="parentMethod">
        <button type="button" @click="parentMethod">Save</button>
    </div>
</template>

<script>
export default {
    name: "InputBody",
    props: {
        value: String,
        parentMethod: Function,
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

    button {
        font-size: 1.4rem;
        padding: 2px 16px;
        margin-left: 8px;
        cursor: pointer;
    }
}
</style>