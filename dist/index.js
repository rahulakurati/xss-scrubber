"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

String.prototype.escape = function () {
  var tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
  };
  return this.replace(/[&<>]/g, function (tag) {
    return tagsToReplace[tag] || tag;
  });
};

module.exports = function JsonScrubber(obj) {
  if (typeof obj === "string") {
    return obj.escape();
  } else if (typeof obj === "number") {
    return obj;
  } else if (Array.isArray(obj)) {
    return obj.map(function (e) {
      return JsonScrubber(e);
    });
  } else if (_typeof(obj) === "object") {
    for (var prop in obj) {
      if (obj[prop]) {
        obj[prop] = JsonScrubber(obj[prop]);
      }
    }

    return obj;
  }
};
