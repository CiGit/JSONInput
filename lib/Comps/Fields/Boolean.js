'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Widget = require('../Views/Widget');

var _Widget2 = _interopRequireDefault(_Widget);

var _fromDefaultValue = require('../Decorators/fromDefaultValue');

var _fromDefaultValue2 = _interopRequireDefault(_fromDefaultValue);

var _validator = require('./../Decorators/validator.js');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BooleanField(props) {
    return _react2.default.createElement(_Widget2.default, props);
}

exports.default = (0, _validator2.default)((0, _fromDefaultValue2.default)(BooleanField));