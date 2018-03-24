<template>
<div>
    <h2>Workbench Servers</h2>

    <router-link :to="{ name: 'server-new'}">Add Server Contact</router-link>

    <br><br>

    <div v-if="loaded">

        <pagination :offset="offset" :limit="limit" :max="max"></pagination>

        <table class="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Endpoint</th>
                    <th>Approx. Running Jobs</th>
                    <th>Approx. Usable Memory</th>
                    <th>Reachable</th>
                    <th>Last Check</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="server in servers">
                    <td>
                        {{ server.id }}
                    </td>
                    <td>
                        <router-link :to="{ name: 'server-edit', params: { id: server.id }}">
                            {{ server.name }}
                        </router-link>
                    </td>
                    <td>
                        {{ server.endpoint }}
                    </td>
                    <td>
                        {{ server.approximateRunningJobs }}
                    </td>
                    <td>
                        {{ server.approximateUsableMemory }}
                    </td>
                    <td>
                        {{ server.reachability }}
                    </td>
                    <td>
                        {{ server.lastChecked }}
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
    props: {
        limit: Number,
        offset: Number
    },
    data () {
        return {
            max: 10,
            servers: [],
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
            Api.getServers(this, this.limit, this.offset, function(data) {
                self.servers = data.body.content
                self.max = data.body.pagination.max
                self.loaded = true
            })
        }
    },
}

</script>
