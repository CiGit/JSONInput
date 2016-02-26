'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Widget = require('../Views/Widget.jsx');

var _Widget2 = _interopRequireDefault(_Widget);

var _fromDefaultValue = require('../Decorators/fromDefaultValue.jsx');

var _fromDefaultValue2 = _interopRequireDefault(_fromDefaultValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BooleanField(props) {
    return _react2.default.createElement(_Widget2.default, props);
}

BooleanField.propTypes = {
    value: _react.PropTypes.bool,
    schema: _react.PropTypes.shape({
        defaultValue: _react.PropTypes.bool
    })
};
exports.default = (0, _fromDefaultValue2.default)(BooleanField);