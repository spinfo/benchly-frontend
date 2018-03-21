<template>
<div>
    <h2>New User</h2>

    <form v-on:submit.prevent="createUser">

        <label for="name">Name</label>
        <input class="smooth" id="name" required v-model="user.name">

        <label for="email">Email</label>
        <input class="smooth" type="email" id="email" required v-model="user.email">

        <label for="email">Password</label>
        <input class="smooth" type="password" id="email" required v-model="user.password">

        <label for="adminStatus">Admin</label>
        <input class="smooth" type="checkbox" id="adminStatus" v-model="user.isAdmin">

        <input class="btn btn-b btn-sm smooth" type="submit" value="Submit">
    </form>
</div>
</template>

<script>
import Api from './api.js'

export default {
    data () {
        return {
            user: {
                name: "",
                email: "",
                password: "",
            },
        }
    },
    methods: {
        createUser: function() {
            const self = this
            Api.postUser(this, this.user, function(data) {
                const id = data.body.content.id
                if (id) {
                    self.$router.push({ name: 'user-index' })
                    self.$emit('newmessages', data.body.messages)
                } else {
                    console.error("Unexpected response on user creation.")
                }
            })
        }
    }
}
</script>