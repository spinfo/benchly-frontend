
<template>
<div>

    <div class="row">
        <div class="col c12">
            <h2>Workflow</h2>
        </div>
    </div>

    <div class="row">
        <input v-model="workflow.name" placeholder="Workflow Name">
    </div>

    <workflow-editor v-if="shouldDisplayEditor"
        :workflow-definition="workflow.definition"
        v-on:saveworkflow="saveWorkflow"
        ></workflow-editor>

</div>
</template>

<script>
import Api from './api.js'
import BlyUtil from './util.js'
import UserMessage from './models/UserMessage.js'
import WorkflowEditor from './workflow-editor/WorkflowEditor.vue'

export default {
    props: [ 'versionId', 'id'],
    data () {
        return {
            workflow: { definition: [] },
            shouldDisplayEditor: true
        }
    },
    created: function() {
        this.fetchWorkflow()
    },
    methods: {
        fetchWorkflow: function() {
            if (!!this.versionId && !!this.id) {
                // TODO: Retrieve a specific workflow version
            } else if (!!this.versionId) {
                const self = this
                Api.getWorkflowByVersionId(this, this.versionId, function(data) {
                    self.setWorkflow(data.body.content)
                })
            }
        },
        saveWorkflow: function(moduleDefinitions) {
            const self = this

            // the backend expects the definition to just be a string
            const workflow = BlyUtil.shallowCopy(this.workflow)
            workflow.definition = JSON.stringify(moduleDefinitions, null, 4)

            // the workflow exists and is updated
            if (workflow.versionId) {
                Api.putWorkflow(this, workflow, function(data) {
                    self.$emit("newmessages", [ UserMessage.ok("Saved") ])
                })
            }
            // a new workflow is created
            else {
                self.shouldDisplayEditor = false
                Api.postWorkflow(this, workflow, function(data) {
                    const workflow = data.body.content
                    const redirect = { path: `/workflows/${workflow.versionId}` }
                    self.$router.push(redirect, function() {
                        self.shouldDisplayEditor = true
                        self.$emit("newmessages", [ UserMessage.ok("Created") ])
                    })
                })
            }
        },
        setWorkflow: function(workflow) {
            try {
                // the backend has the definition as a string, so parse it
                workflow.definition = JSON.parse(workflow.definition)
                this.workflow = workflow
            } catch(e) {
                const msg = "Error on parsing the workflow: " + e.message
                this.$emit("newmessages", [ UserMessage.error(msg) ])
            }
        }
    },
    // this ensures that a user is able to paste a different
    // workflow url and update the view
    watch: {
        '$route': function() { this.fetchWorkflow() }
    },

}

</script>