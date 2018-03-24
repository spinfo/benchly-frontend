<template>
<div>
    <h2>Storage Location</h2>

    <form v-on:submit.prevent="updateStorageConfig">
        <label for="provider">Provider</label>
        <input :value="config.provider" id="provider" disabled>

        <label for="identity">Identity</label>
        <input class="smooth" id="identity" v-model="config.identity" disabled>

        <label for="credential">New Credential</label>
        <input class="smooth" id="credential" v-model="config.credential">

        <label for="container">Container</label>
        <input class="smooth" id="container" v-model="config.container" disabled>

        <input class="btn btn-b btn-sm smooth" type="submit" value="Submit">
    </form>

    <br><br><br><br><br><br><br>

    <form v-on:submit.prevent="deleteStorageConfig">
        <input class="btn btn-c btn-sm smooth" type="submit" value="Delete This Storage Location">
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
            config: {
                "provider": "",
                "identity": "",
                "credential": "",
                "container": ""
            }
        }
    },
    created: function() {
        const self = this
        Api.fetchStorageConfig(this, this.id, function(data) {
            self.config = data.body.content
        })
    },
    methods: {
        updateStorageConfig: function() {
            console.log("called")
            const self = this
            Api.putStorageConfig(this, this.config, function(data) {
                self.$emit('newmessages', [UserMessage.ok("Saved")])
            })
        },
        deleteStorageConfig: function() {
            const confirmed = confirm("Do you really wish to delete this Storage Location. (No files will be deleted.)")
            if (confirmed) {
                const self = this;
                Api.deleteStorageConfig(this, this.config, function(data) {
                    self.$router.push({ name: 'storage-index' })
                    self.$emit('newmessages', data.body.messages)
                })
            }
        }
    }
}
</script>
