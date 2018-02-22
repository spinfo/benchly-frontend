
<template>
<div>

    <h2>Workflow</h2>

    <workflow-editor></workflow-editor>

</div>
</template>

<script>
import WorkflowEditor from './workflow-editor/WorkflowEditor.vue'

export default {
    props: [ 'versionId', 'id'],
    data () {
        return {
            workflow: {}
        }
    },
    created: function() {
        this.fetchWorkflow()
    },
    methods: {
        fetchWorkflow: function() {
            console.log('vId: ' + this.versionId)
            console.log('id: ' + this.id)
        }
    },
    // this ensures that a user is able to paste a different
    // workflow url and update the view
    watch: {
        '$route': function() { this.fetchWorkflows() }
    },

}

</script>