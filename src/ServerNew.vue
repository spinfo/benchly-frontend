<template>
<div>
    <h2>Add Workbench Server</h2>

    <form v-on:submit.prevent="createServerContact">
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
    data () {
        return {
            contact: {
                "endpoint": "",
            },
            checking: false
        }
    },
    methods: {
        createServerContact: function() {
            this.checking = true
            const self = this
            Api.postServerContact(this, this.contact, function(data) {
                const id = data.body.content.id
                if (id) {
                    this.$router.push({ name: 'server-edit', params: { id: id } })
                } else {
                    console.error("Unexpected response on server post.")
                }
            }, function(data) {
                self.$emit('newmessages', [UserMessage.error("Failed to contact server")])
                self.$emit('newmessages', data.body.messages)
                self.checking = false
            })
        }
    }
}
</script>
