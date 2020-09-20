
String.prototype.escape = function() {
    var tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };
    return this.replace(/[&<>]/g, function(tag) {
        return tagsToReplace[tag] || tag;
    });
};

module.exports = function JsonScrubber (obj) {
    if (typeof obj === "string") {
        return obj.escape();
    } else if (typeof obj === "number") {
        return obj;
    } else if (Array.isArray(obj)) {
        return obj.map(e => JsonScrubber(e));
    } else if (typeof obj === "object") {
        for (let prop in obj) {
            if (obj[prop]) {
                obj[prop] = JsonScrubber(obj[prop]);
            }
        }
        return obj;
    }
}

