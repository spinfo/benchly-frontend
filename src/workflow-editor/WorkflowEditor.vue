<template>
    <div id="workflow-editor" class="row">
        <div id="available-modules-area" class="col c4">
            <ul>
                <li v-for="(profiles, category) in moduleProfilesByCategory">
                    <module-category :name="category" :module-profiles="profiles" v-on:newmodule="addModuleToCanvas"></module-category>
                </li>
            </ul>
        </div>

        <div id="workflow-creation-area" class="col c8">
            <div id="workflow-nav">
                <button class="tab" v-on:click="activateTab('canvas')">Workflow</button>
                <button class="tab" v-on:click="activateTab('definition')">JSON</button>

                <div style="float: right;">
                    <button class="tab-bar-action-item" v-on:click="requestSave">Save</button> |
                    <button class="tab-bar-action-item" v-on:click="clearWorkflow">Clear</button> |
                    <button class="tab-bar-action-item" v-on:click="copyWorkflow">Copy</button> |
                    <!-- TODO: This could be in a component -->
                    <button class="tab-bar-action-item" v-on:click="triggerFileInput">
                        Von Datei <input id="hidden-file-input" style="display: none;" type="file">
                    </button> |
                    <button class="tab-bar-action-item" v-on:click="downloadWorkflow">Download</button>
                </div>
            </div>

            <div id="workflow-canvas" v-show="isActiveTab('canvas')">
                <div id="canvas">
                    <div v-for="module in modules" :key="module.getId()">
                        <module :module="module" :profile="getModuleProfile(module)"
                            v-on:moduleremoved="removeModuleFromCanvas"></module>
                    </div>
                </div>
            </div>

            <div id="workflow-definition" v-show="isActiveTab('definition')">
                <pre id="workflow-definition-json">{{ pureModuleDefinitionsAsJSON }}</pre>
            </div>
        </div>
    </div>
</template>

<script>
// mock objects that stand in for the actual api
import mockModuleProfiles from '../assets/mockModuleProfiles.js'

// jsplumb for drawing and editing a workflow's module graph
import jsplumb from '../assets/jsplumb.min.js'
import jsPlumpWorkflowInstanceInit from './jsplumbWorkflowInstance.js'

// TODO: This should be renamed to WorkflowDefinition
import Workflow from './models/Workflow.js'
import ModuleCategory from './ModuleCategory.vue'
import BlyUtil from '../util.js'

export default {
    props: ['workflow-definition'],
    data: function() {
        return {
            workflow: null,
            moduleProfilesByCategory: {},
            moduleProfilesByClass: {},
            activeTab: 'canvas'
        }
    },

    computed: {
        modules: function() {
            if (this.workflow) {
                return this.workflow.getModules()
            } else {
                return []
            }
        },
        // return just the module definitions without their object wrapper
        pureModuleDefinitions: function() {
            if (this.workflow) {
                const definitions = this.workflow.getModules().map(function(m) {
                    return m._definition
                })
                // just stringify the definitions using 4 spaces for indentations
                return definitions
            }
            return []
        },
        pureModuleDefinitionsAsJSON: function() {
            return JSON.stringify(this.pureModuleDefinitions, null, 4)
        }
    },

    created: function() {
        // init a jsplumb instance, this component should be notified of
        // connection changes
        jsPlumpWorkflowInstanceInit(this)
        // fetch some data to display
        this.fetchModuleProfiles()
        // initialise the workflow by adding all modules provided in the workflow
        // definition
        this.addModuleDefinitionsToWorkflow(this.workflowDefinition)
    },

    watch: {
        // this should happen as seldom as possible so we use a watch instead
        // of a computed property
        'workflowDefinition': function() {
            this.addModuleDefinitionsToWorkflow(this.workflowDefinition)
        }
    },

    methods: {

        activateTab: function(tabName) {
            this.activeTab = tabName
        },

        isActiveTab: function(tabName) {
            return this.activeTab === tabName
        },

        // select the workflow definition text and try to copy it to the user's clipboard
        copyWorkflow: function() {
            this.activateTab('definition')
            BlyUtil.copyElemTextToClipboard('workflow-definition-json')
        },

        // offer the user to download the module definitions as a file
        downloadWorkflow: function() {
            BlyUtil.saveToFile(this.pureModuleDefinitionsAsJSON, "workflow.exp", "text/json")
        },

        triggerFileInput: function() {
            const fileInput = document.getElementById('hidden-file-input')
            fileInput.click()
            fileInput.addEventListener('change', this.handleFileInput, { once: true })
        },

        // read an input .exp file
        handleFileInput: function(event) {
            const file = event.target.files[0]
            if (file != null) {
                const reader = new FileReader()
                const self = this
                reader.onload = function(contents) {
                    const definitions = JSON.parse(reader.result)
                    self.addModuleDefinitionsToWorkflow(definitions)
                }
                reader.readAsText(file)
            }
        },

        // remove all modules from the workflow
        // TODO: Sadly this is buggy (old connection ids lead to wrongly painted arrows etc.)
        clearWorkflow: function() {
            const self = this
            window.jsp.batch(function() {
                self.modules.forEach(function(m) { self.removeModuleFromCanvas(m) })
            })
        },

        // fetch the list of available modules from the api
        fetchModuleProfiles: function() {
            const profiles = mockModuleProfiles
            const byCat = {}
            const byClass = {}
            for (let i = 0; i < profiles.length; i++) {
                const profile = profiles[i]

                byClass[profile.canonicalClassName] = profile

                if (!byCat[profile.category]) {
                    byCat[profile.category] = Array()
                }
                byCat[profile.category].push(profile)
            }
            this.moduleProfilesByCategory = byCat
            this.moduleProfilesByClass = byClass
        },

        addModuleDefinitionsToWorkflow: function(definitions) {
            if (!definitions) {
                definitions = []
            }
            const workflow = Workflow.fromDefinitions(definitions)

            // set positioning metadata based on the workflows tree structure
            const rows = workflow.getModuleRows()
            if (rows.length === 0) {
                console.warn("Cycle in module definition.")
            } else {
                this._setModulesPositionMetadata(rows)
            }

            if (this.workflow == null) {
                this.workflow = new Workflow()
            }
            this.workflow.mergeIn(workflow)
        },

        addModuleToCanvas: function(module) {
            this.workflow.addModule(module)
        },

        // remove a module from the workflow taking care to remove all connections
        removeModuleFromCanvas: function(module) {
            window.jsp.remove(String(module.getId()))
            this.workflow.removeModule(module)
        },

        // Add a connection between the two port ids, display and react to errors
        addConnection: function(sourceId, targetId) {
            const errors = this.workflow.addConnection(sourceId, targetId)
            // errors are only logged for now
            if(errors.length > 0) {
                errors.forEach(function(str) {
                    console.warn(str)
                })
                return false
            }
            return true
        },

        // remove a connection from the workflow (should already have been removed from canvas)
        removeConnection: function(sourceId, targetId) {
            this.workflow.removeConnection(sourceId, targetId)
        },

        getModuleProfile: function(module) {
            const profile = this.moduleProfilesByClass[module.getClassName()]
            if (profile == null) {
                console.warn("Could not find profile for class: " + module.getClassName())
                return {}
            }
            return profile
        },

        // sets x/y positions on a number of module rows depending on the position of the module
        // within the row
        _setModulesPositionMetadata: function(rows) {
            var gridHeight = 120
            var gridWidth = 250
            var y = 0
            for (var i = 0; i < rows.length; i++) {
                var x = 0
                for(var j = 0; j < rows[i].length; j++) {
                    var module = rows[i][j]
                    module.setPosition(x, y)
                    x += gridWidth
                }
                y += gridHeight
            }
        },

        requestSave: function() {
            // send the definitions to be saved, hide the workflow object
            this.$emit('saveworkflow', this.pureModuleDefinitions)
        }
    }
}
</script>


<style>
#workflow-editor {
    margin-top: 5px;
    padding-top: 20px;
}

#available-modules-area {
    border: 1px solid #CCC;
    float: left;
    width: 30%;
    margin-top: 0;
    margin-right: 2%;
    /* TODO: Adjust for different screen sizes */
    max-height: 600px;
    overflow: scroll;
}

#workflow-creation-area {
    margin-left: 0;
    float: left;
}

#workflow-definition {
    overflow: scroll;
    font-size: 10px;
    border:1px solid #CCC;
}

#canvas {
    height: 700px;
    border:1px solid #CCC;
    background-color:white;
    display: flex;
    z-index: 3;

    /* .jtk-surface */
    overflow: hidden !important;
    position: relative;
    cursor: move;
    cursor: -moz-grab;
    cursor: -webkit-grab;

    /* IE 10 */
    touch-action:none;

    /* .jtk-surface-nopan */
    overflow: scroll !important;
    cursor:default;
}

#workflow-nav {
    margin-bottom: 10px;
}

#workflow-nav button {
     background:none;
     color:inherit;
     border:none;
     padding:0;
     font: inherit;
     /*border is optional*/
     /*border-bottom:1px solid #444; */
     cursor: pointer;
}

#workflow-nav > button.tab {
    margin-right: 3px;
    text-decoration: none;
    color: #2ca9d3;
    border-top: 1px solid #cfcfcf;
    border-left: 1px solid #cfcfcf;
    border-right: 1px solid #cfcfcf;
    padding: 5px;
}

#workflow-nav button.tab-bar-action-item {
    margin-left: 3px;
    text-decoration: none;
    color: #2ca9d3;
    font-size: small;
}

</style>