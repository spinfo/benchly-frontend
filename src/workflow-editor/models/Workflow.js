
import Module from './Module.js'
import BlyUtil from '../../util.js'

// TODO: This should be named workflow definition
export default Workflow

/**
 * Wraps a workflow of many modules and lets us interact with it.
 * The outside should only interact with one of these.
 */
function Workflow() {

    // a flat list of all the Modules in this workflow
    this.modules = []

    // the modules in this worklow retrievable by their input/output ports ids
    this._byInputIds = {}
    this._byOutputIds = {}

    // add a module to the workflow
    this.addModule = function(module) {
        this.modules.push(module)

        var self = this
        module.getOutputPorts().forEach(function (port) {
            self._byOutputIds[port.getId()] = module
        })
        module.getInputPorts().forEach(function (port) {
            self._byInputIds[port.getId()] = module
        })
    }

    // remove a module from the workflow taking care to disconnect all ports
    // return the removed module and collect connections if an array is supplied
    this.removeModule = function(module) {
        const idx = this.modules.indexOf(module)
        if (idx === -1) {
            console.warn("Cannot remove module. Not in Definition.")
            return
        }
        // remove the module's connections
        const self = this
        module.getConnections().forEach(function (conn) {
            self.removeConnection(conn.source, conn.target)
        })
        // the module has to be removed last for connection removal to work
        var removed = this.modules.splice(idx, 1)
    }

    this.getModules = function() {
        return this.modules
    }

    // Establish a connection between an input port and an output port identified
    // by the given ids.
    // NOTES:
    // A connection cannot be made if:
    //  * sourceId is not a known output port
    //  * targetId is not a known input port
    //  * In- and output port belong to the same module
    //  * In- and output port do not support the same type of pipes
    //  * The connection forms a cyclical dependence in the workflow
    //  * TODO: Root modules should not have input ports (General workflow check)
    //
    // return: An array of Strings (reasons for rejection), empty if all went fine
    this.addConnection = function(sourceId, targetId) {
        var result = []

        var sourceModule = this._byOutputIds[sourceId]
        if (sourceModule == null) {
            result.push("No source module registered for output port id: " + sourceId)
        }

        var targetModule = this._byInputIds[targetId]
        if (targetModule == null) {
            result.push("No target module registered for input port id: " + targetId)
        }

        if (!(result.length == 0)) {
            return result
        }

        if (sourceModule === targetModule) {
            result.push("Reflexive connections are not allowed.")
            return result
        }

        var outputPort = sourceModule.getOutputPort(sourceId)
        var inputPort = targetModule.getInputPort(targetId)

        if (inputPort.isConnected()) {
            // check if the previous connection is the one we want to add and return early if it is
            if (inputPort.isConnectedTo(outputPort)) {
                return result
            }
            result.push("Input port '" + inputPort.name + "' of '" + targetModule.getName() + "' is already connected.")
            return result
        }

        inputPort.connectTo(outputPort)
        outputPort.connectTo(inputPort)

        // wa are now able to detect cycles in the workflow
        var rows = this.getModuleRows()
        if (rows.length === 0) {
            result.push("There is a cycle in the module workflow")
            // reverse the connection if a cycle is detected
            inputPort.disconnectFrom(outputPort)
            outputPort.disconnectFrom(inputPort)
            return result
        }

        return result
    }

    this.removeConnection = function(sourceId, targetId) {
        const outputPort = this._getOutputPort(sourceId)
        const inputPort = this._getInputPort(targetId)
        if (outputPort == null || inputPort == null) {
            console.warn("Can't find source or target port to disconnect.")
            return
        }
        outputPort.disconnectFrom(inputPort)
        inputPort.disconnectFrom(outputPort)
    }

    this.mergeIn = function(otherWorkflow) {
        const self = this
        otherWorkflow.modules.forEach(function(m) {
            self.addModule(m)
        })
    }

    this._getInputPort = function(id) {
        const module = this._byInputIds[id]
        if (module == null) {
            console.warn("Can't find input module for port id: " + id)
            return null
        }
        return module.getInputPort(id)
    },

    this._getOutputPort = function(id) {
        const module = this._byOutputIds[id]
        if (module == null) {
            console.warn("Can't find output module for port id: " + id)
            return null
        }
        return module.getOutputPort(id)
    },

    // traverse the modules' tree and build an array of modules for each level in the tree
    // return those arrays
    // return empty if there is a cycle
    this.getModuleRows = function() {
        // a list of roots and a map of modules by input id are needed to recursively
        // sort the modules by row
        const roots = this.modules.filter(function(m) { return m.isRoot() })

        // check that none of the roots contains cycles
        const self = this
        roots.forEach(function(module) {
            if (self._pathFromModuleContainsCycle(module)) {
                return []
            }
        })

        // actually get the ordered list of rows
        const rows = this._getChildRows([roots])

        // If there is a cycle without a root node in the module's connections
        // it might not have been detected. Prevent that, by checking that all
        // modules are in the list of child rows
        let allAreContained = this.modules.reduce(
            function(acc, module) {
                // a simple linear search should be okay here
                for(let i = 0; i < rows.length; i++) {
                    for(let j = 0; j < rows[i].length; j++) {
                        if (rows[i][j].getId() === module.getId()){
                            return acc && true
                        }
                    }
                }
                return acc && false
            },
            true
        )

        if(allAreContained) {
            return rows
        } else {
            console.log("Found closed cycle without root.")
            return []
        }
    },

    // traverse the given modules, ordered by input ids, starting at the given roots
    // and look for cycles
    // TODO: Delete?
    this._pathFromModuleContainsCycle = function(root, touched = {}) {
        const self = this
        root.getConnectedInputIds().forEach(function(targetId) {
            const child = self._byInputIds[targetId]
            // we must never get to the same module on the same path of ports
            if (touched[child.getId()]) {
                console.log("Found cycle on path.")
                return true
            } else {
                const clone = BlyUtil.shallowCopy(touched)
                clone[child.getId()] = true
                return (false || self._pathFromModuleContainsCycle(child, clone))
            }
        })
        // this is reached if a module does not have any children via connected inputs
        return false
    },

    // recursively build module rows each representing a level in the tree of modules
    this._getChildRows = function(accu, included = {}) {
        // continue from the last row added to the accumulator
        const parentRow = accu[accu.length - 1]
        const children = []
        const self = this
        parentRow.forEach(function(parent) {
            // a module may already have been included because of another input port
            // prevent it from being included again
            if(included[parent.getId()]) {
                return
            } else {
                included[parent.getId()] = true
            }

            // collect the child modules
            parent.getConnectedInputIds().forEach(function(targetId) {
                const child = self._byInputIds[targetId]
                if (child) {
                    children.push(child)
                } else {
                    console.warn("Could not find child for connected id: " + targetId)
                }
            })
        })

        // recurse if we found children, else stop and return the accumulated child rows
        if (children.length > 0) {
            accu.push(children)
            return this._getChildRows(accu, included)
        }
        return accu
    }
}

Workflow.fromDefinitions = function(moduleDefinitions) {
    const workflow = new Workflow()

    moduleDefinitions.forEach(function (definition) {
        workflow.addModule(Module.fromDefinition(definition))
    })

    return workflow
}
