<template>
<div>
    <h1>Login</h1>

    <form v-on:submit.prevent="tryLogin">
        <label>Login</label>

        <input v-if="redirectTarget" type="hidden" name="redirectTarget" value="$redirectTarget">

        <input class="smooth" type="text" name="nameOrEmail" placeholder="Name / Email" required v-model="userInput.nameOrEmail">
        <input class="smooth" type="password" name="password" placeholder="Password" required v-model="userInput.password">

        <input class="btn btn-b btn-sm smooth" type="submit" value="Login">
    </form>
</div>
</template>

<script>
import UserMessage from './models/UserMessage.js'

export default {
    data: function() {
        return {
            redirectTarget: String, // make this a prop, needed?
            userInput: {
                nameOrEmail: "",
                password: ""
            }
        }
    },
    methods: {
        tryLogin() {
            this.$http.post('api/v1/session', this.userInput).then(this.onLoginOk, this.onLoginFail)
        },
        onLoginOk(data) {
            this.$emit('userlogin', data.body.user)
            this.$emit('newmessages', [UserMessage.ok("You have been logged in.")])
        },
        onLoginFail(data) {
            if (data.body.messages) {
                this.$emit('newmessages', data.body.messages)
            } else {
                console.error("User login failed without messages.")
            }
        }
    }
}
</script>

<style>
#form input, #form label, #form button {
    display: block;
    margin-bottom: 10px;
}
</style>