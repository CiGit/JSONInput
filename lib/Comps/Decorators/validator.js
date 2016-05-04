'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _customValidator = require('./../../Utils/customValidator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validated(Comp) {
    function Validator(props) {
        function onChange(val) {
            var validation = (0, _customValidator.validate)(val, props.schema, props.actions.getFormValue());
            var err = validation.errors.map(function (error) {
                return error.message;
            });
            props.onChange(val, err);
        }

        return _react2.default.createElement(Comp, _extends({}, props, {
            errorMessage: props.actions.getErrors(props.path),
            onChange: onChange }));
    }

    return Validator;
}

exports.default = validated;