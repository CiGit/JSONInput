'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.infer = infer;
function infer(value) {
    switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
        case 'number':
            return {
                type: 'number'
            };
        case 'string':
            return {
                type: 'string'
            };
        case 'boolean':
            return {
                type: 'boolean'
            };
        case 'object':
            return {
                type: Array.isArray(value) ? 'array' : 'object'
            };
        default:
            return {
                type: 'string'
            };
    }
}