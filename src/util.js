
export default {

    // a benchly id is just a random integer
    generateId: function() {
        return parseInt(Math.random() * Number.MAX_SAFE_INTEGER)
    },

    arraysEqual: function(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length != b.length) return false;
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    },

    // a naive shallow copy
    shallowCopy: function(obj) {
        const clone = {}
        for (var key in obj) {
            clone[key] = obj[key]
        }
        return clone
    },

    copyElemTextToClipboard: function(elemId) {
        //Before we copy, we are going to select the text.
        var text = document.getElementById(elemId);
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
        //add to clipboard.
        document.execCommand('copy');
    },

    // save data to a file with the argument's name and mime type
    saveToFile: function(data, filename, type) {
        var file = new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
                    url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    },

    getCookie: function(name) {
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);
        if (begin == -1) {
            begin = dc.indexOf(prefix);
            if (begin != 0) return null;
        } else {
            begin += 2;
            var end = document.cookie.indexOf(";", begin);
            if (end == -1) {
            end = dc.length;
            }
        }
        return decodeURI(dc.substring(begin + prefix.length, end));
    },

    expireCookie: function(name) {
        if (this.getCookie(name)) {
            this.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        }
    }
}

