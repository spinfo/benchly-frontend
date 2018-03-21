<template>
<div>
    <h2>Jobs</h2>

    <div v-if="loaded">

        <pagination :offset="offset" :limit="limit" :max="max"></pagination>

        <table id="jobs-table" class="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>State</th>
                    <th>Workflow</th>
                    <th>Submitted</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="job in jobs">
                    <td>
                        <router-link :to="{ name: 'job', params: { id: job.id }}">
                            {{ job.id }}
                        </router-link>
                    </td>
                    <td>
                        {{ job.state }}
                    </td>
                    <td>
                        <router-link :to="{ name: 'workflow-edit', params: { versionId: job.workflow.versionId }}">
                            {{ job.workflow.versionId }}
                        </router-link>
                    </td>
                    <td>
                        {{ job.createdAt }}
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
            Api.getJobs(this, this.limit, this.offset, function(data) {
                self.jobs = data.body.content
                self.max = data.body.pagination.max
                self.loaded = true
            })
        }
    },
}

</script>

<style>

#jobs-table {
    width: 70%;
}


</style>