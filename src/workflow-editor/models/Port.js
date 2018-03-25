
import BlyUtil from '../../util.js'

export default Port

function Port() {

    // the backend's canonical class for the pipe to connect to this port, e.g. "modules.CharPipe"
    this.pipeClass = this.pipeClass || null

    // which pipes are supported, e.g. [ "modules.CharPipe" ]
    this.supportedPipes

    // an id given by the backend or set by us
    this.instanceHashCode = this.instanceHashCode || 0

    // name to be displayed to the user
    this.name = this.name || ""

    // to which other ports this connects, "name" => "class"
    //      e.g.: { "56550365": "modules.CharPipe" }
    this.connectedPipesDestinationHashCodes = this.connectedPipesDestinationHashCodes || {}

    this.getId = function() {
        return this.instanceHashCode
    }

    this.getConnectedIds = function() {
        var ids = []
        for (var key in this.connectedPipesDestinationHashCodes) {
            ids.push(parseInt(key))
        }
        return ids
    }

    this.isConnected = function() {
        for (var key in this.connectedPipesDestinationHashCodes) {
            // a key means the presence of a connection
            return true
        }
        return false
    }

    this.isConnectedTo = function(otherPort) {
        var id = String(otherPort.getId())
        for (var key in this.connectedPipesDestinationHashCodes) {
            if (key === id) {
                return true
            }
        }
        return false
    }

    this.disconnectFrom = function(otherPort) {
        var id = String(otherPort.getId())
        delete this.connectedPipesDestinationHashCodes[id]
    }

    this.connectTo = function(otherPort) {
        // the backend expects these to be strings, so let's please it
        var key = String(otherPort.getId())
        this.connectedPipesDestinationHashCodes[key] = otherPort.pipeClass

        // Set the pipe class that works for both ports
        var found = false;
        for(var i = 0; i < this.supportedPipes.length; i++) {
            const aClass = this.supportedPipes[i]
            if (otherPort.supportedPipes.indexOf(aClass) != -1) {
                this.pipeClass = aClass
                otherPort.pipeClass = aClass
                found = true
                break
            }
        }
        if (!found) {
            console.error("No suitable pipe class found to make a connection.")
        }

    }

    this.getDescription = function() {
        // TODO: retrieve the description via the port/module profile
    }
}

Port.fromProfile = function(profile) {
    var port = new Port()

    // the pipe class is letter adjusted when a connection is made
    port.pipeClass = profile.supportedPipes[0]
    port.instanceHashCode = BlyUtil.generateId()
    port.name = profile.name
    port.supportedPipes = profile.supportedPipes

    return port
}
