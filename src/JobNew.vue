<template>
<div>
    <h1>New Job</h1>

    <form v-on:submit.prevent="createJob">
        <label>For Workflow: {{ job.workflow.name }}</label>

        <br><br>

        <label for="estimatedTime">Estimated Time</label>
        <input class="smooth" type="number" id="estimatedTime" required v-model="job.estimatedTime">

        <label for="estimatedMemory">Estimated Memory</label>
        <input class="smooth" type="number" id="estimatedMemory" required v-model="job.estimatedMemory">

        <input class="btn btn-b btn-sm smooth" type="submit" value="Submit">
    </form>
</div>
</template>

<script>
import Api from './api.js'

export default {
    // the workflow's versionId given by the route
    props: [ 'versionId'],
    data () {
        return {
            job: {
                workflow: {
                    name: "",
                    id: -1,
                    versionId: -1
                },
                estimatedTime: 60,
                estimatedMemory: 1024
            }
        }
    },
    created: function() {
        const self = this;
        Api.getWorkflowByVersionId(this, this.versionId, function(data) {
            self.job.workflow = data.body.content
        })
    },
    methods: {
        createJob: function() {
            Api.postJob(this, this.job, function(data) {
                const id = data.body.content.id
                if (id) {
                    this.$router.push({ name: 'job', params: { id: id } })
                } else {
                    console.error("Unexpected response on job submittal.")
                }
            })
        }
    }
}
</script>