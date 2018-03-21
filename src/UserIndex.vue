<template>
<div>
    <h2>Users</h2>

    <div v-if="loaded">

        <router-link v-if="currentUser.isAdmin" :to="{ name: 'user-new' }">Add User</router-link>

        <br><br>

        <pagination :offset="offset" :limit="limit" :max="max"></pagination>

        <table id="users-table" class="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Mail</th>
                    <th>Admin</th>
                    <th>Registered</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users">
                    <td>
                        <router-link v-if="currentUser.isAdmin" :to="{ name: 'user', params: { id: user.id }}">
                            {{ user.id }}
                        </router-link>
                        <span v-else>
                            {{ user.id }}
                        </span>
                    </td>
                    <td>
                        <router-link v-if="currentUser.isAdmin" :to="{ name: 'user', params: { id: user.id }}">
                            {{ user.name }}
                        </router-link>
                        <span v-else>
                            {{ user.name }}
                        </span>
                    </td>
                    <td>
                        {{ user.email }}
                    </td>
                    <td>
                        <span v-if="user.isAdmin">&#10003;</span>
                        <span v-else>-</span>

                    </td>
                    <td>
                        {{ user.createdAt }}
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</div>
</template>

<script>

import Api from './api.js'
import BlyUtil from './util.js'

export default {
    // limit and offset are passed by query param, not from attributes
    props: {
        limit: Number,
        offset: Number
    },
    data () {
        return {
            currentUser: {},
            max: 10,
            jobs: [],
            loaded: false
        }
    },
    created: function() {
        this.fetch()
    },
    watch: {
        '$route': function() { this.fetch() }
    },
    methods: {
        fetch: function() {
            this.loaded = false
            const self = this
            Api.getUsers(this, this.limit, this.offset, function(data) {
                self.users = data.body.content
                self.currentUser = data.body.user
                self.max = data.body.pagination.max
                self.loaded = true
            })
        }
    },
}

</script>

<style>

#users-table {
    width: 70%;
}


</style>