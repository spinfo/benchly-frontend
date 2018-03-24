
import BlyUtil from './util.js'
import UserMessage from './models/UserMessage.js'

// NOTE: Refactoring this to be a plugin could alleviate the need to pass a component around
//  https://vuejs.org/v2/guide/plugins.html
export default {

    root: "api/v1",

    workflowsPath: "/workflows",
    sessionPath:   "/session",
    jobsPath:      "/jobs",
    usersPath:     "/users",
    storagePath:   "/storage",
    serversPath:   "/server_contacts",

    get: function(component, path, params, onSuccess, onFailure) {
        const errCb = this.buildErrorCallback(component, onFailure)
        return component.$http.get(path, { params: params }).then(onSuccess, errCb)
    },

    post: function(component, path, data, onSuccess, onFailure) {
        const errCb = this.buildErrorCallback(component, onFailure)
        return component.$http.post(path, data).then(onSuccess, errCb)
    },

    put: function(component, path, data, onSuccess, onFailure) {
        const errCb = this.buildErrorCallback(component, onFailure)
        return component.$http.put(path, data).then(onSuccess, errCb)
    },

    delete: function(component, path, onSuccess, onFailure) {
        const errCb = this.buildErrorCallback(component, onFailure)
        return component.$http.delete(path).then(onSuccess, errCb)
    },

    // WORKFLOW

    getWorkflows: function(component, limit, offset, onSuccess) {
        const path = this.root + this.workflowsPath
        const params = { limit: limit, offset: offset }
        return this.get(component, path, params, onSuccess, null)
    },

    getWorkflowByVersionId: function(component, versionId, onSuccess) {
        const path = this.root + this.workflowsPath + '/' + versionId
        return this.get(component, path, {}, onSuccess, null)
    },

    putWorkflow: function(component, workflow, onSuccess) {
        const path = this.root + this.workflowsPath + "/" + workflow.versionId
        return this.put(component, path, workflow, onSuccess, null)
    },

    postWorkflow: function(component, workflow, onSuccess) {
        const path = this.root + this.workflowsPath
        return this.post(component, path, workflow, onSuccess, null)
    },

    // SESSION

    getSession: function(component, onSuccess) {
        const path = this.root + this.sessionPath
        return this.get(component, path, {}, onSuccess, this.emptyCallback)
    },

    postSession: function(component, data, onSuccess) {
        const path = this.root + this.sessionPath
        return this.post(component, path, data, onSuccess, null)
    },

    deleteSession: function(component, onSuccess, onFailure) {
        const path = this.root + this.sessionPath
        return this.delete(component, path, onSuccess, onFailure)
    },

    // JOB

    getJobById: function(component, jobId, onSuccess) {
        const path = this.root + this.jobsPath + '/' + jobId
        return this.get(component, path, {}, onSuccess, null)
    },

    postJob: function(component, job, onSuccess) {
        const path = this.root + this.jobsPath
        return this.post(component, path, job, onSuccess, null)
    },

    cancelJob: function(component, job, onSuccess) {
        const path = this.root + this.jobsPath + '/' + job.id
        return this.delete(component, path, onSuccess, null)
    },

    getJobs: function(component, limit, offset, onSuccess) {
        const path = this.root + this.jobsPath
        const params = { limit: limit, offset: offset }
        return this.get(component, path, params, onSuccess, null)
    },

    // USER

    getUserById: function(component, userId, onSuccess) {
        const path = this.root + this.usersPath + '/' + userId
        return this.get(component, path, {}, onSuccess, null)
    },

    getUsers: function(component, limit, offset, onSuccess) {
        const path = this.root + this.usersPath
        const params = { limit: limit, offset: offset }
        return this.get(component, path, params, onSuccess, null)
    },

    postUser: function(component, user, onSuccess) {
        const path = this.root + this.usersPath
        return this.post(component, path, user, onSuccess, null)
    },

    putUser: function(component, user, onSuccess) {
        const path = this.root + this.usersPath + "/" + user.id
        return this.put(component, path, user, onSuccess, null)
    },

    deleteUser: function(component, user, onSuccess) {
        const path = this.root + this.usersPath + "/" + user.id
        return this.delete(component, path, onSuccess, null)
    },


    // STORAGE

    getStorageIndex: function(component, onSuccess) {
        const path = this.root + this.storagePath
        return this.get(component, path, {}, onSuccess, null)
    },

    fetchStorageConfig: function(component, id, onSuccess) {
        const path = this.root + this.storagePath + '/' + id
        return this.get(component, path, {}, onSuccess, null)
    },

    putStorageConfig: function(component, config, onSuccess) {
        const path = this.root + this.storagePath + '/' + config.id
        return this.put(component, path, config, onSuccess, null)
    },

    postStorageConfig: function(component, config, onSuccess) {
        const path = this.root + this.storagePath
        return this.post(component, path, config, onSuccess, null)
    },

    refreshStorageConfig: function(component, config, onSuccess) {
        const path = this.root + this.storagePath + '/' + config.id
        const params = { refresh: true }
        return this.get(component, path, params, onSuccess, null)
    },

    deleteStorageFile: function(component, config, file, onSuccess) {
        const path = this.root + this.storagePath + '/' + config.id + '/files/' + file.id
        return this.delete(component, path, onSuccess, null)
    },

    deleteStorageConfig: function(component, config, onSuccess) {
        const path = this.root + this.storagePath + '/' + config.id
        return this.delete(component, path, onSuccess, null)
    },

    // WORKBENCH SERVERS

    getServers: function(component, limit, offset, onSuccess) {
        const path = this.root + this.serversPath
        const params = { limit: limit, offset: offset }
        return this.get(component, path, params, onSuccess, null)
    },

    getServerContact: function(component, id, onSuccess) {
        const path = this.root + this.serversPath + '/' + id
        return this.get(component, path, {}, onSuccess, null)
    },

    putServerContact: function(component, contact, onSuccess, onFailure) {
        const path = this.root + this.serversPath + '/' + contact.id
        return this.put(component, path, contact, onSuccess, onFailure)
    },

    postServerContact: function(component, contact, onSuccess, onFailure) {
        const path = this.root + this.serversPath
        return this.post(component, path, contact, onSuccess, onFailure)
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
