<template>
    <div class="props-editor">
        <table>
            <tr v-for="(_, key) in currentState" :title="propertyDescriptions[key]">
                <td>{{ key }}</td>
                <td><input type="text" v-model="currentState[key]"></td>
            </tr>
        </table>

        <button v-on:click="save">Save</button>
        <button v-on:click="resetState">Reset</button>
    </div>
</template>


<script>
import BlyUtil from '../util.js'

export default {
    props: {
        // the module properties this editor was started with { String => String }
        initialState: {},
        // descriptions for the properties in the initial and/or current state
        propertyDescriptions: {}
    },
    data: function() {
        return {
            currentState: {}
        }
    },
    methods: {
        resetState: function() {
            this.currentState = BlyUtil.shallowCopy(this.initialState)
        },
        save: function() {
            this.$emit('module-properties-saved', this.currentState)
        }
    },
    created: function() {
        this.resetState()
    }
}
</script>

<style>
.props-editor {
    font-size: 11pt;
    padding: 20px;
}

.props-editor td {
    padding-right: 13px;
}

.props-editor td > input {
    width: 100%;
}

.props-editor > button {
    margin-top: 20px;
    margin-right: 10px;
}

</style>
