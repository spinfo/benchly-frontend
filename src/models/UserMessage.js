
export default UserMessage

function UserMessage(type, text) {
    this.type = type
    this.text = text
}

UserMessage.ok = function(message) {
    return new UserMessage("OK", message)
}

UserMessage.info = function(message) {
    return new UserMessage("INFO", message)
}

UserMessage.warn = function(message) {
    return new UserMessage("WARN", message)
}

UserMessage.error = function(message) {
    return new UserMessage("ERROR", message)
}
