<template>
<div style="padding: 20px">
    <div v-if="configSelection">
        <h4>Choose a location</h4>
        <ul>
            <li v-for="config in configs">
                <button class="link-button" v-on:click="switchToConfig(config)">
                    {{ config.provider }} | {{ config.container }} (as {{ config.identity }})
                </button>
            </li>
        </ul>
    </div>

    <div v-if="fileSelection">
        <h4>Enter a filename</h4>
        <form>
            <input class="smooth" v-model="file.name" >

            <input v-on:click.prevent="chooseFile" type="submit" class="btn btn-sm btn-b" value="OK" >
        </form>
    </div>
</div>
</template>


<script>
import Api from '../api.js'
export default {
    data: function () {
        return {
            configs: {},
            chosenConfig: null,
            file: {
                name: ""
            },
            configSelection: true,
            fileSelection: false
        }
    },
    created: function() {
        const self = this
        Api.getStorageIndex(this, function(data) {
            self.configs = data.body.content
            self.ready = true
        })
    },
    methods: {
        switchToConfig(config) {
            this.configSelection = false
            const self = this
            Api.fetchStorageConfigWithCredential(this, config.id, function(data) {
                self.chosenConfig = data.body.content
                this.fileSelection = true
            })
        },
        chooseFile() {
            console.log("called")
            this.$emit('outputfilechosen', this.chosenConfig, this.file.name)
        }
    }
}
</script>


<style>
button.link-button {
    margin-left: 3px;
    text-decoration: none;
    color: #2ca9d3;
    border: none;
    font-size: large;
    cursor: pointer;
    background: white;
    margin-bottom: 6px;
}
</style>