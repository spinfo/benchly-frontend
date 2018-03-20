<template>
<div>
    <h2>Workflows</h2>

    <div id="workflow-links">
        <router-link to="workflows/new">New Workflow</router-link>
    </div>

    <div v-if="anyWorkflows">

        <pagination :offset="offset" :limit="limit" :max="max"></pagination>

        <table id="workflows-table" class="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th><!-- Run --></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="workflow in workflows">
                    <td>
                        <router-link :to="{ name: 'workflow-edit', params: { versionId: workflow.versionId }}">
                            {{ workflow.id }}
                        </router-link>
                    </td>
                    <td>
                        <router-link :to="{ name: 'workflow-edit', params: { versionId: workflow.versionId }}">
                            {{ workflow.name }}
                        </router-link>
                    </td>
                    <td>
                        {{ workflow.author.name }}
                    </td>
                    <td>
                        <router-link :to="{ name: 'job-new', params: { versionId: workflow.versionId }}">
                            Run
                        </router-link>
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
            workflows: []
        }
    },
    computed: {
        anyWorkflows: function() { return BlyUtil.isNonEmptyArray(this.workflows) }
    },
    created: function() {
        this.fetchWorkflows()
    },
    watch: {
        '$route': function() { this.fetchWorkflows() }
    },
    methods: {
        fetchWorkflows: function() {
            const self = this
            Api.getWorkflows(this, this.limit, this.offset, function(data) {
                self.workflows = data.body.content
                self.max = data.body.pagination.max
            })
        },
        routeTo(workflow) {
            // TODO: Needs a better place...
            return 'workflows/' + workflow.versionId
        }
    },
}

</script>

<style>

#workflows-table {
    width: 80%;
}

#workflow-links {
    margin-bottom: 15px;
}


</style>