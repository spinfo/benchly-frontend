<template>
    <div>
        <strong v-on:click="toggleModuleList" style="cursor: pointer;">
            {{ name }} [{{open ? '-' : '+'}}]
        </strong>
        <ul v-show="open">
            <li v-for="profile in moduleProfiles" v-on:click="addModule(profile)" style="cursor: pointer;">
                {{ profile.name }}
            </li>
        </ul>
    </div>
</template>

<script>
import Module from './models/Module.js'

export default {
    props: {
        name: String,
        moduleProfiles: Array
    },
    data: function() {
        return {
            open: false
        }
    },
    methods: {
        toggleModuleList: function() {
            this.open = !this.open
        },
        addModule: function(moduleProfile) {
            var module = Module.fromProfile(moduleProfile)
            this.$emit('newmodule', module)
        }
    }
}
</script>