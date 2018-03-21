<template>
<div v-if="loaded">
    <h2>Profile</h2>

    <form v-on:submit.prevent="updateUser">

        <label for="name">Name</label>
        <input class="smooth" id="name" required v-model="user.name">

        <label for="email">Email</label>
        <input class="smooth" type="email" id="email" required v-model="user.email">

        <label v-if="isCurrentUser" for="email">Password</label>
        <input v-if="isCurrentUser" class="smooth" type="password" id="email" required v-model="user.password">

        <label v-if="currentUser.isAdmin && !isCurrentUser" for="adminStatus">Admin</label>
        <input v-if="currentUser.isAdmin && !isCurrentUser" class="smooth" type="checkbox" id="adminStatus" v-model="user.isAdmin">

        <input class="btn btn-b btn-sm smooth" type="submit" value="Update">
    </form>

    <br><br><br><br><br><br><br>

    <form v-if="currentUser.isAdmin" v-on:submit.prevent="deleteUser">
        <input class="btn btn-c btn-sm smooth" type="submit" value="Delete This Account">
    </form>
</div>
</template>

<script>
import Api from './api.js'
import UserMessage from './models/UserMessage.js'

export default {
    // the workflow's versionId given by the route
    props: [ 'id'],
    data () {
        return {
            user: {},
            currentUser: {},
            loaded: false
        }
    },
    computed: {
        isCurrentUser: function() {
            return (this.user.id === this.currentUser.id)
        },
    },
    created: function() {
        this.fetchUser()
    },
    methods: {
        updateUser: function() {
            const self = this
            Api.putUser(this, this.user, function(data) {
                const id = data.body.content.id
                if (id) {
                    self.$emit('newmessages', [UserMessage.ok("Updated!")])
                } else {
                    console.error("Unexpected response on user update.")
                }
            })
        },
        deleteUser: function() {
            const confirmed = confirm("Do you really wish to delete this account?")
            if (confirmed) {
                const self = this;
                Api.deleteUser(this, this.user, function(data) {
                    self.$router.push({ name: 'user-index' })
                    self.$emit('newmessages', data.body.messages)
                })
            }
        },
        fetchUser: function() {
            const self = this
            self.loaded = false
            Api.getUserById(this, this.id, function(data) {
                self.user = data.body.content
                self.currentUser = data.body.user
                self.loaded = true
            })
        }
    },
    watch: {
        '$route': function() { this.fetchUser() }
    },
}
</script>