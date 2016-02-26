'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Widget = require('../Views/Widget');

var _Widget2 = _interopRequireDefault(_Widget);

var _fromDefaultValue = require('../Decorators/fromDefaultValue');

var _fromDefaultValue2 = _interopRequireDefault(_fromDefaultValue);

var _validator = require('../Decorators/validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function StringField(props) {
    var onChange = function onChange(val) {
        props.onChange(val === '' ? undefined : String(val));
    };
    return _react2.default.createElement(_Widget2.default, _extends({}, props, {
        onChange: onChange }));
}

StringField.propTypes = {
    value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    schema: _react.PropTypes.shape({
        defaultValue: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
        type: _react.PropTypes.oneOf(['number', 'string'])
    }),
    onChange: _react.PropTypes.func.isRequired
};
exports.default = (0, _validator2.default)((0, _fromDefaultValue2.default)(StringField));