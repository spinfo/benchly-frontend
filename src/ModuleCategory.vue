<template>
    <div>
        <strong v-on:click="toggleModuleList" class="module-category-name">
            {{ name }} [{{open ? '-' : '+'}}]
        </strong>
        <ul v-show="open">
            <li v-for="profile in moduleProfiles" v-on:click="addModule(profile)" class="module-add-link">
                <span v-tooltip="{ content: profile.description, delay: 1000, placement: 'right-end', classes: ['module-description-tooltip'] }">
                    {{ profile.name }}
                </span>
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

<style>
.module-category-name {
    cursor: pointer;
}

.module-add-link {
    cursor: pointer;
}

.module-add-link:hover {
    color: #2ca9d3;
}

.module-description-tooltip {
    background-color: #cacaca;
    z-index: 9000;
    padding: 7px;
    font-size: small;
    border: 1px solid black;
}

</style>