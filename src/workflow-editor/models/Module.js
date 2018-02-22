
import Port from './Port.js'
import BlyUtil from '../../util.js'

export default Module

/**
 * This wraps the (slightly complicated) module definition of the backend and adds a bunch
 * of convenience functions for easier interaction.
 */
function Module() {

    // TODO: Put these at top level and instantiate with Module.call() ?
    this._definition = {
        properties: {
            name: ""
        },
        moduleInstanceHashCode: 0,

        // this module's class in the backend, e.g.: "modules.input_output.FileReaderModule"
        moduleCanonicalClassName: "",

        // the input ports, defined as: "name" => Port
        serializableInputPortList: {},

        // the output ports, defined as "name" => Port
        serializableOutputPortList: {},

        // metadata setable, mostly used for positioning the element
        metadata: {
            xpos: 0,
            ypos: 0
        }
    }

    // return: [Port]
    this.getInputPorts = function() {
        return this._portListInit(this._definition.serializableInputPortList)
    }

    // return: [Port]
    this.getOutputPorts = function() {
        return this._portListInit(this._definition.serializableOutputPortList)
    }

    // return: [Port]
    this.getPorts = function() {
        return this.getInputPorts().concat(this.getOutputPorts())
    }

    // initialize one of the serializable input/output port "lists" (actually hashes/objects)
    // return: [Port]
    this._portListInit = function(objects) {
        var ports = []
        for (var portName in objects) {
            // set the port to be a Port and collect
            Port.call(objects[portName])
            ports.push(objects[portName])
        }
        return ports
    }

    // get ids of all ports for which this module is the source
    // return: [Int]
    this.getConnectedInputIds = function() {
        return this._collectConnectedIdsFromPorts(this.getOutputPorts())
    }

    // get ids of all ports for which this module is the target
    // return: [Int]
    this.getConnectedOutputIds = function() {
        return this._collectConnectedIdsFromPorts(this.getInputPorts())
    }

    this._collectConnectedIdsFromPorts = function(ports) {
        var result = []
        for (var i = 0; i < ports.length; i++) {
            result = result.concat(ports[i].getConnectedIds())
        }
        // sort and unique before return
        result.sort()
        result = result.reverse().filter(function (e, i, result) {
            return result.indexOf(e, i+1) === -1;
        }).reverse();
        return result
    }

    // return a { source: "id", target: "id" } object for all connections
    // leading to this module
    this.getIncomingConnections = function() {
        const result = []
        this.getInputPorts().forEach(function(port) {
            port.getConnectedIds().forEach(function(id) {
                result.push({ source: id, target: port.getId() })
            })
        })
        return result
    }

    // return a { source: "id", target: "id" } object for all connections
    // leading to this module
    this.getOutgoingConnections = function() {
        const result = []
        this.getOutputPorts().forEach(function(port) {
            port.getConnectedIds().forEach(function(id) {
                result.push({ source: port.getId(), target: id })
            })
        })
        return result
    }

    // return a { source: "id", target: "id" } object for all connections
    // leading to or from this module
    this.getConnections = function() {
        return this.getIncomingConnections().concat(this.getOutgoingConnections())
    }

    // return: Bool
    this.isRoot = function() {
        // a module is a root if it has no input connected to anything
        var ports = this.getInputPorts()
        for (var i = 0; i < ports.length; i++) {
            if (ports[i].isConnected()) {
                return false
            }
        }
        return true
    }

    this.getName = function() {
        return this._definition.properties.name
    }

    this.getId = function() {
        return this._definition.moduleInstanceHashCode
    }

    this.getPosition = function() {
        this._initMetadataIfMissing()
        return {
            x: this._definition.metadata.xpos,
            y: this._definition.metadata.ypos
        }
    }

    this.setPosition = function(x, y) {
        this._initMetadataIfMissing()
        this._definition.metadata.xpos = x
        this._definition.metadata.ypos = y
    }

    this.getInputPort = function(id) {
        return this._getPort(id, this._definition.serializableInputPortList)
    }

    this.getOutputPort = function(id) {
        return this._getPort(id, this._definition.serializableOutputPortList)
    }

    this._getPort = function(id, portList) {
        for (var name in portList) {
            if (portList[name].getId() === id) {
                return portList[name]
            }
        }
        return null
    }

    this.getClassName = function() {
        return this._definition.moduleCanonicalClassName
    }

    this.getProperties = function() {
        return this._definition.properties
    }

    this.setProperties = function(properties) {
        return this._definition.properties = properties
    }

    this._initMetadataIfMissing = function() {
        if (this._definition.metadata == null) {
            this._definition.metadata = {}
        }
    }
}


// Initialize a module from a concrete module definition as given by the backend
Module.fromDefinition = function(definition) {
    var module = new Module()
    module._definition = definition
    return module
}

Module.fromProfile = function(profile) {
    // TODO: Initialize a module from an abstract module profile
    var module = new Module
    var def = module._definition

    def.properties = BlyUtil.shallowCopy(profile.propertyDefaultValues)

    def.moduleInstanceHashCode = BlyUtil.generateId()
    def.moduleCanonicalClassName = profile.canonicalClassName

    var putPortsIntoNamedHash = function(portProfiles) {
        const hash = {}
        for (var i = 0; i < portProfiles.length; i++) {
            var p = Port.fromProfile(portProfiles[i])
            hash[p.name] = p
        }
        return hash
    }

    def.serializableInputPortList = putPortsIntoNamedHash(profile.inputPorts)
    def.serializableOutputPortList = putPortsIntoNamedHash(profile.outputPorts)

    return module
}

