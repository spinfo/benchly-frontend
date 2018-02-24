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
import Api from './api.js'
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
            const self = this
            Api.postSession(this, this.userInput, function(data) {
                self.$emit('userlogin', data.body.user)
                // TODO: Only do this if we actually were on the site before...
                self.$router.go(-1)
            })
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