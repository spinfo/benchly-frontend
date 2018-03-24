<template>
<div>
    <h2>Workbench Server</h2>

    <form v-on:submit.prevent="updateServerContact">
        <label for="name">Name</label>
        <input :value="contact.name" id="name" disabled>

        <label for="endpoint">Endpoint</label>
        <input class="smooth" id="endpoint" required v-model="contact.endpoint">

        <div v-if="checking" class="btn btn-sm smooth">Checking...</div>
        <input v-else class="btn btn-b btn-sm smooth" type="submit" value="Submit">
    </form>

</div>
</template>

<script>
import Api from './api.js'
import UserMessage from './models/UserMessage.js'

export default {
    props: [ 'id' ],
    data () {
        return {
            contact: {
                "name": "",
                "endpoint": "",
            },
            checking: false
        }
    },
    created: function() {
        const self = this
        Api.getServerContact(this, this.id, function(data) {
            self.contact = data.body.content
        })
    },
    methods: {
        updateServerContact: function() {
            this.checking = true
            const self = this
            Api.putServerContact(this, this.contact, function(data) {
                self.$emit('newmessages', [UserMessage.ok("Saved")])
                self.checking = false
            }, function(data) {
                self.$emit('newmessages', [UserMessage.error("Failed to contact server")])
                self.$emit('newmessages', data.body.messages)
                self.checking = false
            })
        }
    }
}
</script>
