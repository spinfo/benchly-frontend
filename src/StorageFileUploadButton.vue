<template>
    <div>
        <form enctype="multipart/form-data" :action="uploadPath" method="post"
            novalidate style="display: none">
            <div>
                <input :id="fileInputId"
                    type="file" :name="fileInputId"
                    :disabled="config.isSavingFile"
                    @change="filesChange($event.target.name, $event.target.files)"
                    accept="*/*"
                >
                <input :id="submitInputId" type="submit">
            </div>
        </form>
        <div class="btn btn-a btn-sm" v-on:click="clickInput">
            <span v-if="uploading">Uploading...</span>
            <span v-else>Upload</span>
        </div>
    </div>
</template>

<script>
import Api from './api.js'

export default {
    props: ['config'],
    data () {
        return {
            uploading: false
        }
    },
    computed: {
        fileInputId: function() {
            return 'upload' + this.config.id
        },
        submitInputId: function() {
            return 'submit' + this.config.id
        },
        uploadPath: function() {
            return '/api/v1/storage/' + this.config.id + "/files"
        }
    },
    methods: {
        filesChange: function (elementName, files) {

            const file = files[0]

            const formData = new FormData()
            const xhr = new XMLHttpRequest()

            const self = this
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log("OK!")
                    } else {
                        self.$emit('newmessages', "File upload failed: " + xhr.status)
                    }
                    self.uploading = false
                }
            }

            const path = this.uploadPath + "?fileName=" + encodeURIComponent(file.name)
            formData.append('upload', file, file.name)
            xhr.open('POST', path, true)
            xhr.send(formData)
            this.uploading = true
        },
        clickInput: function () {
            const inputElem = document.getElementById(this.fileInputId)
            inputElem.click()
        }
    }
}

</script>