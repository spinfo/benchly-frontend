<template>
<div>
    <h2>Storage</h2>

    <div v-if="ready">

        <div v-for="config in configs" style="margin-bottom: 50px">

            <br>

            <div class="row">

                <div class="col c8">
                    <h4>{{ config.provider}} | {{config.container}}</h4>
                    <div>Last refresh: {{ config.refreshedAt }}</div>
                </div>
                <div class="col c4">
                    <storage-file-upload-button :config="config" style="float:right; margin: 7px"></storage-file-upload-button>

                    <div class="btn btn-b btn-sm" style="float:right; margin: 7px" v-on:click="refresh(config)">
                        <span v-if="config.isLoading">Loading...</span>
                        <span v-else>Refresh</span>
                    </div>
                </div>

            </div>

            <br>

            <table class="table">
                <thead>
                    <tr>
                        <th>Filename</th>
                        <th>Size [B]</th>
                        <th>Last Modified</th>
                        <th><!-- Delete buttons --></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="file in config.filesMeta">
                        <td>
                            <a :href="'api/v1/storage/' + config.id + '/files/' + file.id + '/download'">
                                {{ file.name }}
                            </a>
                        </td>
                        <td>
                            {{ file.size }}
                        </td>
                        <td>
                            {{ file.lastModified }}
                        </td>
                        <td>
                            <b v-on:click="deleteFile(config, file)" style="cursor: pointer">❌</b>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <pre>
            <!-- {{ configs }} -->
        </pre>

    </div>

</div>
</template>


<script>
import Api from './api.js'

export default {
    data () {
        return {
            ready: false,
            configs: [],
            toggles: { }
        }
    },
    created: function() {
        const self = this;
        self.ready = false
        Api.getStorageIndex(this, function(data) {
            self.configs = data.body.content
            self.configs.forEach( function(c) {
                self.initConfig(c)
            })
            self.ready = true
        })
    },
    methods: {
        toggle: function(config) {
            config.isToggled = !config.isToggled
        },
        refresh: function(config) {
            if (config.isLoading) {
                return
            }
            config.isLoading = true

            const self = this
            Api.refreshStorageConfig(this, config, function(data) {
                const config = data.body.content

                // simply search for the config by id
                const idx = self.getConfigIndex(config)
                if (idx == -1) {
                    console.warn("config could not be found for refresh.")
                } else {
                    self.initConfig(config)
                    self.configs.splice(idx, 1, config)
                }
            })
        },
        getConfigIndex: function(config) {
            for(var i = 0; i < this.configs.length; i++) {
                if (this.configs[i].id === config.id) {
                    return i
                }
            }
            return -1
        },
        initConfig: function(config) {
            // fields for display are directly set on the config
            this.$set(config, 'isLoading')
        },
        deleteFile: function(config, file) {
            console.log(file)
            const confirmed = confirm("Do you really wish to delete the file: " + file.name)
            if (confirmed) {
                const self = this;
                Api.deleteStorageFile(this, config, file, function(data) {
                    self.refresh(config)
                })
            }
        }
    }
}
</script>


</script>