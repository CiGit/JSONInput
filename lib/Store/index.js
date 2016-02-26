'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _baobab = require('baobab');

var _baobab2 = _interopRequireDefault(_baobab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tree = function tree() {
    return new _baobab2.default({
        schema: {},
        value: {},
        status: {}
    });
};

exports.default = tree;