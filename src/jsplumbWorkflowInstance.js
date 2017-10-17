
export default jsPlumpWorkflowInstanceInit

/**
 * Set up a new jsplumbinstance, the onConnectionDelegate should support:
 *      addConnection(int sourceId, int targetId)
 *      removeConnection(int sourceId, int targetId)
 * TODO: Could be turned into a Vue component and communicate via $emit
 */
function jsPlumpWorkflowInstanceInit(onConnectionDelegate) {

    jsPlumb.ready(function() {

        // setup some defaults for jsPlumb.
        var instance = jsPlumb.getInstance({
            Endpoint: ["Dot", { radius: 4, hoverClass: 'bly-endpoint-hover' }],
            Connector:"StateMachine",
            // HoverPaintStyle: {stroke: "#1e8151", strokeWidth: 2 },
            ConnectionOverlays: [
                [ "Arrow", {
                    location: 1,
                    id: "arrow",
                    length: 14,
                    foldback: 0.8
                } ],
                [ "Label", {}, { /*label: "", id: "label", cssClass: "aLabel"*/ } ]
            ],
            Container: "canvas"
        })

        // set the onConnectionDelegate that jsplumb can call when a connection is made or
        // removed
        instance._bly_onConnectionDelegate = onConnectionDelegate

        // define the connection type that we will use to connect pipes
        instance.registerConnectionType("basic", { anchor:"Continuous", connector:"StateMachine", reattach: true });

        window.jsp = instance;

        // bind a click listener to each connection; the connection is deleted.
        instance.bind("click", function(c) {
            instance.deleteConnection(c);
        })

        // when a connection is made, tell the app and react to errors
        instance.bind("connection", function(cInfo) {
            var conns = this.getConnections({source: cInfo.sourceId, target: cInfo.targetId})
            if (conns.length > 1) {
                // if the connection between the same ports was already present, just remove
                // the new one and be done
                instance.deleteConnection(conns[conns.length - 1])
            } else {
                // if the app reports errors in adding, remove the displayed connection immediately
                const result = instance._bly_onConnectionDelegate.addConnection(parseInt(cInfo.sourceId), parseInt(cInfo.targetId))
                if (!result) {
                    instance.deleteConnection(conns[0])
                }
            }
        })

        instance.bind("connectionDetached", function(cInfo) {
            instance._bly_onConnectionDelegate.removeConnection(parseInt(cInfo.sourceId), parseInt(cInfo.targetId))
        })

        instance.bind("connectionMoved", function(cMoveInfo) {
            // Only remove the old connection, a separate "connection"
            // event triggers the addition of the new connection
            const sourceId = parseInt(cMoveInfo.originalSourceId)
            const targetId = parseInt(cMoveInfo.originalTargetId)
            instance._bly_onConnectionDelegate.removeConnection(sourceId, targetId)
        })


        // turns a dom element into a module, i.e. a draggable container of input and output ports
        // we do not use the jsplumb "groups" interface because we do not really need it
        // NOTE: Connects elements, but may fail to, if both ends of the connection are not already
        //       present on the canvas
        instance._bly_initModuleGroup = function(el, connections = []) {

            // make the whole area draggable
            instance.draggable(el)

            // make output ports into sources where a connection may be drawn from
            var outputsElem = el.getElementsByClassName('bly-output-ports')[0]
            for (var i = 0; i < outputsElem.children.length; i++) {
                var output = outputsElem.children[i]
                instance.makeSource(output, {
                    anchor: "Continuous",
                    connectorStyle: { stroke: "#000000", strokeWidth: 2, outlineStroke: "transparent", outlineWidth: 4 },
                    connectionType:"basic",
                })
            }

            // make inputs to targets where a connection may be dropped
            var inputsDiv = el.getElementsByClassName('bly-input-ports')[0]
            for (var i = 0; i < inputsDiv.children.length; i++) {
                var input = inputsDiv.children[i]
                instance.makeTarget(input, {
                    dropOptions: { hoverClass: "dragHover" },
                    anchor: "Continuous",
                    allowLoopback: false,
                    maxConnections: -1, // connections require a more complex check elsewhere
                })
            }

            for (var i = 0; i < connections.length; i++) {
                var connection = connections[i]
                var newConnection = instance.connect(connection)
                // set the new connection's type to the one we define for the instance
                // if it was successfully created
                if (newConnection.target && newConnection.source) {
                    newConnection.toggleType("basic")
                }
            }
        }
    })
}
