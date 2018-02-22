<template>
    <div>
        <strong v-on:click="toggleModuleList" class="module-category-name">
            {{ name }} [{{open ? '-' : '+'}}]
        </strong>
        <ul v-show="open">
            <li v-for="profile in moduleProfiles">
                <span v-on:click="addModule(profile)" class="module-add-link">
                    {{ profile.name }}
                </span>
                <span v-on:click="openProfileDescription(profile.name)" class="module-add-link">
                    &#x24d8;
                </span>

                <modal :name="profile.name"
                    height="auto"
                    width="50%"
                    :resizable="true"
                    :pivot-y="0.1"
                    :scrollable="true">
                    <div v-html="profile.description" class="profile-description" />
                </modal>
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
        },
        openProfileDescription: function(name) {
            this.$modal.show(name)
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

.profile-description {
    font-size: 11pt;
    padding: 20px;
}

</style>