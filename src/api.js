
import BlyUtil from './util.js'
import UserMessage from './models/UserMessage.js'

// NOTE: Refactoring this to be a plugin could alleviate the need to pass a component around
//  https://vuejs.org/v2/guide/plugins.html
export default {

    rootPath: "api/v1",

    workflowsPath: "/workflows",
    sessionPath: "/session",

    get: function(component, path, params, onSuccess, onFailure) {
        const errCb = this.buildErrorCallback(component, onFailure)
        return component.$http.get(path, { params: params }).then(onSuccess, errCb)
    },

    post: function(component, path, data, onSuccess, onFailure) {
        const errCb = this.buildErrorCallback(component, onFailure)
        return component.$http.post(path, data).then(onSuccess, errCb)
    },

    delete: function(component, path, onSuccess, onFailure) {
        const errCb = this.buildErrorCallback(component, onFailure)
        return component.$http.delete(path).then(onSuccess, errCb)
    },

    getWorkflows: function(component, limit, offset, onSuccess) {
        const path = this.rootPath + this.workflowsPath
        const params = { limit: limit, offset: offset }
        return this.get(component, path, params, onSuccess, null)
    },

    getSession: function(component, onSuccess) {
        const path = this.rootPath + this.sessionPath
        return this.get(component, path, {}, onSuccess, this.emptyCallback)
    },

    postSession: function(component, data, onSuccess) {
        const path = this.rootPath + this.sessionPath
        return this.post(component, path, data, onSuccess, null)
    },

    deleteSession: function(component, onSuccess, onFailure) {
        const path = this.rootPath + this.sessionPath
        return this.delete(component, path, onSuccess, onFailure)
    },

    // if callback is non-null just return it, else build a funcion that will call the
    // default error callback using the provided component
    buildErrorCallback: function(component, callback) {
        if (!!callback) {
            return callback
        } else {
            const self = this
            return function(response) { self.defaultErrorCallback(component, response)}
        }
    },

    // the default error callback will emit any messages returned from the server or
    // it will construct an alternative error message and emit that
    defaultErrorCallback: function(component, response) {
        const msgs = response.body.messages

        // if messages are returned from the server show those
        if (BlyUtil.isArray(msgs) && msgs.length > 0) {
            component.$emit('newmessages', response.body.messages)
        }
        // no messages were returned so show some other info about the error
        else {
            var text = "Unexpected Server Response: " + response.status
            text += " (" + response.statusText + ")"
            component.$emit('newmessages', [UserMessage.error(text)])
        }
    },

    // intentionally do nothing
    emptyCallback: function() {}

}
