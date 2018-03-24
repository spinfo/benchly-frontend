<template>
<div>
    <h2>New Storage Location</h2>

    <form v-on:submit.prevent="createStorageConfig">
        <label for="provider">Provider</label>
        <select class="smooth" id="provider" required v-model="config.provider">
            <option value="aws-s3">aws-s3</option>
            <option value="b2">b2</option>
            <option value="openstack-swift">openstack-swift</option>
        </select>

        <label for="identity">Identity</label>
        <input class="smooth" id="identity" required v-model="config.identity">

        <label for="credential">Credential</label>
        <input class="smooth" id="credential" required v-model="config.credential">

        <label for="container">Container</label>
        <input class="smooth" id="container" required v-model="config.container">

        <input class="btn btn-b btn-sm smooth" type="submit" value="Submit">
    </form>
</div>
</template>

<script>
import Api from './api.js'

export default {
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
    methods: {
        createStorageConfig: function() {
            Api.postStorageConfig(this, this.config, function(data) {
                const id = data.body.content.id
                if (id) {
                    this.$router.push({ name: 'storage-edit', params: { id: id } })
                } else {
                    console.error("Unexpected response on config post.")
                }
            })
        }
    }
}
</script>
