<template>
<div v-if="ready">
    <h2>Job #{{ job.id }}</h2>

    <table class="table">
        <tbody>
            <tr>
                <td>Workflow</td>
                <td>
                    <router-link :to="{ name: 'workflow-edit', params: { versionId: job.workflow.versionId }}">
                        {{ job.workflow.versionId }}
                    </router-link>
                </td>
            </tr>
            <tr>
                <td>State</td>
                <td>{{ job.state }}</td>
            </tr>
            <tr>
                <td>Estimated time</td>
                <td>{{ job.estimatedTime }}</td>
            </tr>
            <tr>
                <td>Estimated memory</td>
                <td>{{ job.estimatedMemory }}</td>
            </tr>
            <tr>
                <td>Submitted on</td>
                <td>{{ job.createdAt }}</td>
            </tr>
            <tr v-if="job.failedSubmittalAttempts != 0">
                <td>Failed Submittals</td>
                <td>{{ job.failedSubmittalAttempts }}</td>
            </tr>
        </tbody>
    </table>

    <br>

    <div v-if="job.state === 'SUBMITTED'">
        <form v-if="cancelSubmitted" v-on:submit.prevent="doNothing">
            <input class="btn btn-sm smooth" type="submit" value="Cancel submitted">
        </form>
        <form v-else v-on:submit.prevent="cancelJob">
            <input class="btn btn-c btn-sm smooth" type="submit" value="Cancel">
        </form>
    </div>

    <div v-if="job.messages">
        <h3>Messages</h3>

        <table class="table">
            <tbody>
            <tr v-for="message in job.messages">
                <td>{{ message.recordedAt }}</td>
                <td>{{ message.content }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
import Api from './api.js'

export default {
    // the workflow's versionId given by the route
    props: [ 'id'],
    data () {
        return {
            job: { },
            ready: false,
            cancelSubmitted: false
        }
    },
    created: function() {
        const self = this;
        Api.getJobById(this, this.id, function(data) {
            self.job = data.body.content
            self.ready = true
        })
    },
    methods: {
        cancelJob: function() {
            const self = this
            Api.cancelJob(this, this.job, function(data) {
                self.cancelSubmitted = true
                self.$emit('newmessages', data.body.messages)
            })
        },
        doNothing: function() { }
    }
}
</script>