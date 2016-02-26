'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Undefined(props) {
    return _react2.default.createElement(
        'span',
        null,
        'Undefined field type "' + props.schema.type + '", [' + props.path + ']'
    );
}

exports.default = Undefined;