'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function onInputChange(func) {
    return function onChange(event) {
        if (event.target.type === 'checkbox') {
            func(event.target.checked);
        } else {
            func(event.target.value);
        }
    };
}

function Input(props) {
    return _react2.default.createElement('input', { type: props.type,
        placeholder: props.schema.placeholder,
        value: props.value,
        className: props.className,
        onChange: onInputChange(props.onChange),
        checked: props.checked });
}

Input.propTypes = {
    type: _react.PropTypes.string.isRequired,
    defaultValue: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
    className: _react.PropTypes.string,
    onChange: _react.PropTypes.func.isRequired,
    checked: _react.PropTypes.bool,
    value: _react.PropTypes.any,
    schema: _react.PropTypes.shape({
        placeholder: _react.PropTypes.string
    })
};
exports.default = Input;