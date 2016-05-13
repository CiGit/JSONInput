'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _labeled = require('../Decorators/labeled');

var _labeled2 = _interopRequireDefault(_labeled);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ArrowNumberWidget(props) {
    return _react2.default.createElement(_Input2.default, _extends({}, props, {
        type: 'number'
    }));
}

exports.default = (0, _labeled2.default)(ArrowNumberWidget);