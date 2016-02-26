'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Object = require('./Object.jsx');

var _Object2 = _interopRequireDefault(_Object);

var _String = require('./String.jsx');

var _String2 = _interopRequireDefault(_String);

var _Number = require('./Number.jsx');

var _Number2 = _interopRequireDefault(_Number);

var _Boolean = require('./Boolean.jsx');

var _Boolean2 = _interopRequireDefault(_Boolean);

var _Array = require('./Array.jsx');

var _Array2 = _interopRequireDefault(_Array);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    object: _Object2.default,
    string: _String2.default,
    number: _Number2.default,
    boolean: _Boolean2.default,
    array: _Array2.default
};