<template>
    <div :id="id" class="bly-module" :style="style">
        <button class="bly-module-close-btn" style="float: right;" v-on:click="removeModule()">
            ❌
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
</template>

<script>
// a module drawn on the canvas and configurable by the user
export default {
    props: {
        module: Object
    },
    data: function() {
        return {
            id: this.module.getId(),
            name: this.module.getName(),
            inputPorts: this.module.getInputPorts(),
            outputPorts: this.module.getOutputPorts()
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

.bly-module-close-btn {
    padding: 2px;
    cursor: pointer;
    background-color: white;
    color: #aeaeae;
    border: 1px solid #aeaeae;
}
.bly-module-close-btn:hover {
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