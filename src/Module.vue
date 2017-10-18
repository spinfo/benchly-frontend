<template>
    <div>
        <div :id="id" class="bly-module" :style="style">
            <button class="bly-module-btn" v-on:click="removeModule()">
                ❌
            </button>
            <button class="bly-module-btn" v-on:click="openPropertiesEditor()">
                <b>&nbsp;i&nbsp;</b>
            </button>

            <div>{{ name }}</div>

            <div style="margin-top: 10px">
                <div style="float: left;" class="bly-input-ports">
                    <div v-for="port in inputPorts" class="bly-port" :id="port.instanceHashCode">
                        {{ port.name }}
                    </div>
                </div>
                <div style="float: left; margin-left: 10px" class="bly-output-ports">
                    <div v-for="port in outputPorts" class="bly-port bly-output-port" :id="port.instanceHashCode">
                        {{ port.name }}
                    </div>
                </div>
            </div>
        </div>
        <!-- Each modal needs to be at the same level as it's module to not be overlayed by other modules -->
        <modal :name="propertiesEditorName"
            height="auto"
            width="50%"
            :resizable="true"
            :pivot-y="0.1"
            :scrollable="true">
            <module-properties-editor
                :initial-state="moduleProperties"
                :property-descriptions="propertyDescriptions"
                v-on:module-properties-saved="saveProperties" />
        </modal>
    </div>
</template>

<script>
// a module drawn on the canvas and configurable by the user
export default {
    props: {
        module: Object,
        // these will be passed right through to the properties editor
        propertyDescriptions: Object
    },
    data: function() {
        return {
            id: this.module.getId(),
            name: this.module.getName(),
            inputPorts: this.module.getInputPorts(),
            outputPorts: this.module.getOutputPorts(),
            propertiesEditorName: 'propsEditor' + String(this.module.getId())
        }
    },
    computed: {
        style: function() {
            var pos = this.module.getPosition()
            return {
                left: pos.x + "px",
                top: pos.y + "px"
            }
        },
        moduleProperties: function() {
            if (this.module) {
                return this.module.getProperties()
            }
            return {}
        }
    },
    mounted: function () {
        // tell jsplumb to initialize this element as a draggable
        // connectable module group but only if everything is ready
        var self = this
        this.$nextTick(function() {
            jsPlumb.ready(function() {
                // jsplumb needs our module connections with string ids
                const conns = self.module.getIncomingConnections().map(function(conn) {
                    return { source: String(conn.source), target: String(conn.target)}
                })
                window.jsp._bly_initModuleGroup(self.$el, conns)
            })
        })
    },
    methods: {
        removeModule: function() {
            this.$emit('moduleremoved', this.module)
        },
        openPropertiesEditor() {
            this.$modal.show(this.propertiesEditorName)
        },
        saveProperties(newProperties) {
            this.module.setProperties(newProperties)
            this.$modal.hide(this.propertiesEditorName)
        }
    }
}
</script>

<style>
/* A module (container for ports) on the canvas */
.bly-module {
    padding: 16px;
    position: absolute;
    z-index: 4;
    border: 1px solid black;
    box-shadow: 2px 2px 19px #e0e0e0;
    opacity: 0.8;
    cursor: move;
    background-color: white;
    font-size: 11px;
    -webkit-transition: background-color 0.25s ease-in;
    -moz-transition: background-color 0.25s ease-in;
    transition: background-color 0.25s ease-in;
}

.bly-module-btn {
    float: right;
    padding: 2px;
    margin: 2px;
    cursor: pointer;
    background-color: white;
    color: #aeaeae;
    border: 1px solid #aeaeae;
}
.bly-module-btn:hover {
    background-color: #a1a1a1;
    color: black;
    border: 1px solid black;
}


/* The i/o ports of modules */
.bly-port {
    padding: 4px;
    position: relative;
    z-index: 6;
    border: 1px solid black;
    box-shadow: 2px 2px 19px #e0e0e0;

    opacity: 0.8;
    cursor: move;
    background-color: white;
    font-size: 9px;
    -webkit-transition: background-color 0.25s ease-in;
    -moz-transition: background-color 0.25s ease-in;
    transition: background-color 0.25s ease-in;
}

.bly-output-port {
    cursor: pointer;
}

/* Endpoints used to drag connections between modules */
.bly-endpoint-hover {
    cursor: pointer;
}

.jtk-connector, .jtk-endpoint {
    z-index: 8;
}

.jtk-connector, .jtk-connector-outline {
    cursor: pointer;
}
</style>