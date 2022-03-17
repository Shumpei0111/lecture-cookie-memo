<template>
    <div>
        <h3>login</h3>
        <div>
            <label for="loginId">ID</label>
            <input type="text" name="login" id="loginId" v-model="loginId" >
        </div>
        <div>
            <label for="loginPass">PASS</label>
            <input type="password" name="login" id="loginPass" v-model="loginPass">
        </div>
        <button type="button" @click="submitLogin">Login</button>
    </div>
</template>

<script>
export default {
    name: "Login",
    data: function() {
        return {
            loginId: "",
            loginPass: ""
        }
    },
    methods: {
        submitLogin: function() {
            const _id = encodeURIComponent( this.loginId );
            const _pass = encodeURIComponent( this.loginPass );
            this.$emit( "valid-login", { id: _id, pass: _pass } )
        },
    }
}
</script>