'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.infer = infer;
function infer(value) {
    switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
        case 'number':
            return 'number';
        case 'string':
            return 'string';
        case 'boolean':
            return 'boolean';
        case 'object':
            return Array.isArray(value) ? 'array' : 'object';
        default:
            return 'string';
    }
}